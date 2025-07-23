const vscode = require('vscode');

/**
 * একটি সুন্দর এবং তথ্যপূর্ণ ফাংশন সাজেশন আইটেম তৈরি করে।
 * @param {object} options
 * @returns {vscode.CompletionItem}
 */
function createFunctionSnippet({ name, signature, documentation, body }) {
    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
    item.insertText = new vscode.SnippetString(body || name + '($1)');
    item.detail = signature;
    item.documentation = new vscode.MarkdownString(documentation);
    return item;
}

/**
 * @returns {vscode.CompletionItem[]}
 */
function getWordpressFunctions() {
    const functionsData = {
        // --- Core API Functions ---
        'add_action': { signature: '(string $hook_name, callable $callback, ...)', documentation: 'Hooks a function on to a specific action. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/add_action/)', body: "add_action( '${1:hook_name}', '${2:callback_function}', ${3:10}, ${4:1} );" },
        'add_filter': { signature: '(string $hook_name, callable $callback, ...)', documentation: 'Hooks a function to a specific filter action. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/add_filter/)', body: "add_filter( '${1:hook_name}', '${2:callback_function}', ${3:10}, ${4:1} );" },
        'do_action': { signature: '(string $hook_name, mixed $arg)', documentation: 'Execute functions hooked on a specific action hook. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/do_action/)', body: "do_action( '${1:hook_name}' );" },
        'apply_filters': { signature: '(string $hook_name, mixed $value)', documentation: 'Call the functions added to a filter hook. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/apply_filters/)', body: "apply_filters( '${1:hook_name}', ${2:\\$value} );" },

        // --- Theme Functions & Template Tags ---
        'get_header': { signature: '()', documentation: 'Loads the header template. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_header/)' },
        'get_footer': { signature: '()', documentation: 'Loads the footer template. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_footer/)' },
        'get_sidebar': { signature: '()', documentation: 'Loads the sidebar template. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_sidebar/)' },
        'wp_head': { signature: '()', documentation: 'Prints scripts or data in the head tag on the front end. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_head/)' },
        'wp_footer': { signature: '()', documentation: 'Prints scripts or data before the closing body tag on the front end. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_footer/)' },
        'the_title': { signature: '()', documentation: 'Displays the title of the current post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_title/)' },
        'the_content': { signature: '()', documentation: 'Displays the content of the current post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_content/)' },
        'the_excerpt': { signature: '()', documentation: 'Displays the excerpt of the current post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_excerpt/)' },
        'the_permalink': { signature: '()', documentation: 'Displays the URL for the permalink to the current post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_permalink/)' },
        'the_post_thumbnail': { signature: '(string|array $size)', documentation: 'Displays the post thumbnail. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_post_thumbnail/)' },
        'have_posts': { signature: '()', documentation: 'Determines whether current WordPress query has posts to loop over. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/have_posts/)' },
        'the_post': { signature: '()', documentation: 'Iterate the post index in The Loop. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/the_post/)' },

        // --- Query Functions ---
        'WP_Query': { signature: '(array $args)', documentation: 'The main query class. Used to retrieve posts. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/classes/wp_query/)', body: "\\$args = array(\n\t'post_type' => '${1:post}',\n\t'posts_per_page' => ${2:10}\n);\n\\$query = new WP_Query( \\$args );\n\nif ( \\$query->have_posts() ) {\n\twhile ( \\$query->have_posts() ) {\n\t\t\\$query->the_post();\n\t\t// Your code here\n\t}\n}\nwp_reset_postdata();" },
        'get_posts': { signature: '(array $args)', documentation: 'Retrieves an array of the latest posts, or posts matching the given criteria. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_posts/)' },
        'get_post': { signature: '(int|WP_Post $post, ...)', documentation: 'Retrieves post data given a post ID or post object. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_post/)' },

        // --- Post Functions ---
        'wp_insert_post': { signature: '(array $postarr, ...)', documentation: 'Inserts or updates a post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_insert_post/)' },
        'wp_update_post': { signature: '(array $postarr, ...)', documentation: 'Updates an existing post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_update_post/)' },
        'get_post_meta': { signature: '(int $post_id, string $key, bool $single)', documentation: 'Retrieve post meta field for a post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_post_meta/)' },
        'update_post_meta': { signature: '(int $post_id, string $meta_key, ...)', documentation: 'Update post meta field based on post ID. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/update_post_meta/)' },
        'add_post_meta': { signature: '(int $post_id, string $meta_key, ...)', documentation: 'Add meta data field to a post. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/add_post_meta/)' },

        // --- Taxonomy & Term Functions ---
        'register_taxonomy': { signature: '(string $taxonomy, array|string $object_type, ...)', documentation: 'Registers a taxonomy for a post type. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/register_taxonomy/)' },
        'get_terms': { signature: '(array|string $args)', documentation: 'Retrieves the terms in a taxonomy. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_terms/)' },
        'has_term': { signature: '(string|int|array $term, ...)', documentation: 'Checks if the current post has any of the given terms. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/has_term/)' },

        // --- User & Role Functions ---
        'get_current_user_id': { signature: '()', documentation: 'Retrieves the ID of the current user. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_current_user_id/)' },
        'current_user_can': { signature: '(string $capability, ...)', documentation: 'Checks if the current user has a specific capability. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/current_user_can/)' },
        'get_user_meta': { signature: '(int $user_id, string $key, bool $single)', documentation: 'Retrieve user meta field for a user. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_user_meta/)' },

        // --- Option & Settings API ---
        'get_option': { signature: '(string $option, mixed $default)', documentation: 'Retrieves an option value based on an option name. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_option/)' },
        'update_option': { signature: '(string $option, mixed $value, ...)', documentation: 'Updates the value of an option that was already added. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/update_option/)' },
        'add_option': { signature: '(string $option, mixed $value, ...)', documentation: 'Adds a new option. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/add_option/)' },

        // --- URL & Path Functions ---
        'site_url': { signature: '(string $path, string $scheme)', documentation: 'Retrieves the site URL for the current site. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/site_url/)' },
        'home_url': { signature: '(string $path, string $scheme)', documentation: 'Retrieves the home URL for the current site. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/home_url/)' },
        'get_template_directory_uri': { signature: '()', documentation: 'Retrieves the URI of the current theme directory. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/get_template_directory_uri/)' },
        'plugins_url': { signature: '(string $path, string $plugin)', documentation: 'Retrieves the URL for the plugins directory. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/plugins_url/)' },

        // --- Security & Validation ---
        'wp_create_nonce': { signature: '(string|int $action)', documentation: 'Creates a cryptographic token. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_create_nonce/)' },
        'wp_verify_nonce': { signature: '(string $nonce, string|int $action)', documentation: 'Verify that a nonce is correct and is not expired. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/wp_verify_nonce/)' },
        'sanitize_text_field': { signature: '(string $str)', documentation: 'Sanitizes a string from user input or from the database. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/sanitize_text_field/)' },
        'esc_html': { signature: '(string $text)', documentation: 'Escaping for HTML blocks. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/esc_html/)' },
        'esc_attr': { signature: '(string $text)', documentation: 'Escaping for HTML attributes. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/esc_attr/)' },
        'esc_url': { signature: '(string $url, ...)', documentation: 'Checks and cleans a URL. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/esc_url/)' },

        // --- Internationalization (i18n) ---
        '__': { signature: '(string $text, string $domain)', documentation: 'Retrieve the translation of $text. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/__/)', body: "__( '${1:text}', '${2:textdomain}' )" },
        '_e': { signature: '(string $text, string $domain)', documentation: 'Display translated text. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/_e/)', body: "_e( '${1:text}', '${2:textdomain}' );" },
        '_x': { signature: '(string $text, string $context, ...)', documentation: 'Retrieve translated string with gettext context. \n\n[View on Developer Handbook](https://developer.wordpress.org/reference/functions/_x/)' },
    };

    return Object.entries(functionsData).map(([name, data]) => {
        return createFunctionSnippet({ name, ...data });
    });
}

function register(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'php', // This provider should only be active inside PHP files/tags.
        {
            provideCompletionItems(document, position) {
                return getWordpressFunctions();
            }
        }
    );
    context.subscriptions.push(provider);
}

module.exports = { register };