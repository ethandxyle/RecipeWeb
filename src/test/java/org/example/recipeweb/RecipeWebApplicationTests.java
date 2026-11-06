package org.example.recipeweb;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.recipeweb.repository.RecipeRepo;
import org.example.recipeweb.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "spring.datasource.url=jdbc:h2:mem:recipeweb-tests;DB_CLOSE_DELAY=-1")
@AutoConfigureMockMvc
class RecipeWebApplicationTests {

    private static final String PASSWORD = "class-password-123";

    @Autowired private MockMvc mvc;
    @Autowired private ObjectMapper mapper;
    @Autowired private RecipeRepo recipes;
    @Autowired private UserRepo users;
    @Autowired private PasswordEncoder passwordEncoder;

    @BeforeEach
    void clearDatabase() {
        recipes.deleteAll();
        users.deleteAll();
    }

    @Test
    void visitorsCanBrowseButCannotSubmitOrRestoreASession() throws Exception {
        ApiClient visitor = new ApiClient();
        visitor.get("/api/recipes").andExpect(status().isOk()).andExpect(jsonPath("$").isEmpty());
        visitor.get("/api/auth/me").andExpect(status().isUnauthorized());
        visitor.mutate(HttpMethod.POST, "/api/recipes", recipe("Soup"))
                .andExpect(status().isUnauthorized());
        assertThat(recipes.count()).isZero();
    }

    @Test
    void registrationHashesPasswordsAndRejectsDuplicateOrInvalidAccounts() throws Exception {
        ApiClient visitor = new ApiClient();
        JsonNode registered = json(visitor.register("student")
                .andExpect(status().isCreated())
                .andExpect(jsonPath("username").value("student"))
                .andExpect(jsonPath("password").doesNotExist())
                .andExpect(jsonPath("recipes").doesNotExist()));

        var stored = users.findByUsername("student").orElseThrow();
        assertThat(registered.path("id").asLong()).isEqualTo(stored.getId());
        assertThat(stored.getPassword()).isNotEqualTo(PASSWORD);
        assertThat(passwordEncoder.matches(PASSWORD, stored.getPassword())).isTrue();

        visitor.register("student").andExpect(status().isConflict());
        visitor.mutate(HttpMethod.POST, "/api/auth/register",
                Map.of("username", "  ", "password", PASSWORD)).andExpect(status().isBadRequest());
        visitor.mutate(HttpMethod.POST, "/api/auth/register",
                Map.of("username", "other", "password", "short")).andExpect(status().isBadRequest());
        assertThat(users.count()).isEqualTo(1);
    }

    @Test
    void legacyRegistrationEndpointAlsoReturnsOnlyPublicAccountFields() throws Exception {
        new ApiClient().mutate(HttpMethod.POST, "/api/users/register", credentials("legacy"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("username").value("legacy"))
                .andExpect(jsonPath("password").doesNotExist())
                .andExpect(jsonPath("recipes").doesNotExist());
    }

    @Test
    void loginPersistsIdentityAndLogoutRevokesIt() throws Exception {
        ApiClient student = new ApiClient();
        student.register("student").andExpect(status().isCreated());
        student.mutate(HttpMethod.POST, "/api/auth/login",
                Map.of("username", "student", "password", "wrong-password"))
                .andExpect(status().isUnauthorized());
        student.get("/api/auth/me").andExpect(status().isUnauthorized());

        student.login("student").andExpect(status().isOk())
                .andExpect(jsonPath("username").value("student"))
                .andExpect(jsonPath("password").doesNotExist());
        student.get("/api/auth/me").andExpect(status().isOk())
                .andExpect(jsonPath("username").value("student"));

        student.mutate(HttpMethod.POST, "/api/auth/logout", null).andExpect(status().isNoContent());
        student.get("/api/auth/me").andExpect(status().isUnauthorized());
        student.mutate(HttpMethod.POST, "/api/recipes", recipe("Soup"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void mutatingRequestsRequireCsrfProtectionEvenWhenLoggedIn() throws Exception {
        mvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(credentials("student"))))
                .andExpect(status().isForbidden());

        ApiClient student = signedIn("student");
        mvc.perform(post("/api/recipes").session(student.session)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsBytes(recipe("Soup"))))
                .andExpect(status().isForbidden());
        assertThat(recipes.count()).isZero();
    }

    @Test
    void recipesAreSavedWithTheSignedInOwnerAndSerializeWithoutPrivateAccountData() throws Exception {
        ApiClient other = signedIn("other");
        long otherId = json(other.get("/api/auth/me")).path("id").asLong();
        ApiClient student = signedIn("student");
        long studentId = json(student.get("/api/auth/me")).path("id").asLong();

        Map<String, Object> input = recipe("Soup");
        input.put("user", Map.of("id", otherId));
        JsonNode created = json(student.mutate(HttpMethod.POST, "/api/recipes", input)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("user.id").value(studentId))
                .andExpect(jsonPath("user.username").value("student"))
                .andExpect(jsonPath("user.password").doesNotExist())
                .andExpect(jsonPath("user.recipes").doesNotExist()));

        assertThat(recipes.findById(created.path("id").asLong())).isPresent();
        new ApiClient().get("/api/recipes").andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Soup"))
                .andExpect(jsonPath("$[0].user.username").value("student"))
                .andExpect(jsonPath("$[0].user.password").doesNotExist())
                .andExpect(jsonPath("$[0].user.recipes").doesNotExist());
    }

    @Test
    void onlyTheRecipeOwnerCanUpdateOrDeleteIt() throws Exception {
        ApiClient owner = signedIn("owner");
        long id = json(owner.mutate(HttpMethod.POST, "/api/recipes", recipe("Soup"))
                .andExpect(status().isCreated())).path("id").asLong();
        ApiClient other = signedIn("other");

        other.mutate(HttpMethod.PUT, "/api/recipes/" + id, recipe("Stolen soup"))
                .andExpect(status().isForbidden());
        other.mutate(HttpMethod.DELETE, "/api/recipes/" + id, null).andExpect(status().isForbidden());
        assertThat(recipes.findById(id).orElseThrow().getTitle()).isEqualTo("Soup");

        owner.mutate(HttpMethod.PUT, "/api/recipes/" + id, recipe("Better soup"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("title").value("Better soup"))
                .andExpect(jsonPath("user.username").value("owner"));
        owner.mutate(HttpMethod.DELETE, "/api/recipes/" + id, null).andExpect(status().isNoContent());
        assertThat(recipes.findById(id)).isEmpty();
    }

    @Test
    void invalidRecipesAndMissingRecipesReturnUsefulClientErrors() throws Exception {
        ApiClient student = signedIn("student");
        Map<String, Object> invalid = recipe("  ");
        invalid.put("calories", -1);
        invalid.put("protein", -1);
        invalid.put("cookingTime", 0);
        student.mutate(HttpMethod.POST, "/api/recipes", invalid)
                .andExpect(status().isBadRequest()).andExpect(jsonPath("error").isString());
        assertThat(recipes.count()).isZero();

        student.mutate(HttpMethod.PUT, "/api/recipes/999999", recipe("Missing"))
                .andExpect(status().isNotFound());
        student.mutate(HttpMethod.DELETE, "/api/recipes/999999", null).andExpect(status().isNotFound());
    }

    private ApiClient signedIn(String username) throws Exception {
        ApiClient client = new ApiClient();
        client.register(username).andExpect(status().isCreated());
        client.login(username).andExpect(status().isOk());
        return client;
    }

    private Map<String, String> credentials(String username) {
        return Map.of("username", username, "password", PASSWORD);
    }

    private Map<String, Object> recipe(String title) {
        Map<String, Object> recipe = new LinkedHashMap<>();
        recipe.put("title", title);
        recipe.put("description", "Cook vegetables in stock until tender.");
        recipe.put("difficulty", "Easy");
        recipe.put("category", "Lunch");
        recipe.put("ingredients", "Carrots, potatoes, vegetable stock");
        recipe.put("calories", 250);
        recipe.put("protein", 8);
        recipe.put("cookingTime", 30);
        return recipe;
    }

    private JsonNode json(ResultActions result) throws Exception {
        return mapper.readTree(result.andReturn().getResponse().getContentAsByteArray());
    }

    /** Keeps the session as a browser would, including login rotation and logout invalidation. */
    private class ApiClient {
        private MockHttpSession session;

        private ResultActions get(String path) throws Exception {
            return perform(request(HttpMethod.GET, path));
        }

        private ResultActions register(String username) throws Exception {
            return mutate(HttpMethod.POST, "/api/auth/register", credentials(username));
        }

        private ResultActions login(String username) throws Exception {
            return mutate(HttpMethod.POST, "/api/auth/login", credentials(username));
        }

        private ResultActions mutate(HttpMethod method, String path, Object body) throws Exception {
            JsonNode csrf = json(get("/api/auth/csrf").andExpect(status().isOk()));
            MockHttpServletRequestBuilder builder = request(method, path)
                    .header(csrf.path("headerName").asText(), csrf.path("token").asText());
            if (body != null) {
                builder.contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsBytes(body));
            }
            return perform(builder);
        }

        private ResultActions perform(MockHttpServletRequestBuilder builder) throws Exception {
            if (session != null) {
                builder.session(session);
            }
            ResultActions result = mvc.perform(builder);
            session = (MockHttpSession) result.andReturn().getRequest().getSession(false);
            return result;
        }
    }
}
