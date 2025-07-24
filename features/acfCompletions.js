const vscode = require('vscode');

/**
 * @param {object} options 
 * @param {string} options.label 
 * @param {string} options.prefix 
 * @param {string} options.body 
 * @param {string} options.detail 
 * @param {string} options.documentation 
 * @returns {vscode.CompletionItem}
 */
function createCompletionItem({ label, prefix, body, detail, documentation }) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString(body);
    item.detail = detail;
    item.documentation = new vscode.MarkdownString(documentation || '');
    item.filterText = prefix;
    return item;
}

/**
 * @returns {vscode.CompletionItem[]}
 */
function getAcfSnippets() {
    const snippetsData = {

        // --- General PHP Snippet ---
        "PHP: Markup": {
            prefix: "php",
            detail: "PHP Snippet",
            body: "<?php ${1} ?>",
            documentation: "**PHP Opening and Closing Tag**\n\nQuickly inserts a standard PHP tag pair and places the cursor inside."
        },
        "Comments: PHP Block": {
            prefix: "php-comment",
            detail: "PHP Comment Snippet",
            body: "/*\n * \n * ${1:PHP Comments}\n * \n */",
            documentation: "**PHP Block Comment**\n\nCreates a standard multi-line comment block for PHP code."
        },
        "eg: echo get_field": {
            prefix: "eg",
            detail: "ACF Snippet",
            body: "echo get_field('${1:field_name}');",
            documentation: "**echo get_field()**\n\nOutputs the value of an ACF field."
        },
        "gf: get_field": {
            prefix: "gf",
            detail: "ACF Snippet",
            body: "get_field('${1:field_name}');",
            documentation: "**get_field()**\n\nGets the value of an ACF field, typically for use in a variable."
        },
        "sf: get_sub_field": {
            prefix: "sf",
            detail: "ACF Snippet",
            body: "get_sub_field('${1:sub_field_name}');",
            documentation: "**get_sub_field()**\n\nGets the value of an ACF sub-field (inside a Repeater, Group, etc.)."
        },
        "esf: echo get_sub_field": {
            prefix: "esf",
            detail: "ACF Snippet",
            body: "echo get_sub_field('${1:sub_field_name}');",
            documentation: "**echo get_sub_field()**\n\nOutputs the value of an ACF sub-field."
        },
        "WP: Post Type": {
            prefix: "post_type",
            detail: "WordPress Snippet",
            documentation: "**Register Custom Post Type**\n\nCreates a complete snippet for registering a new custom post type in WordPress.",
            body: [
                "function register_${2:my}_custom_post_type() {",
                "",
                "    \\$labels = array(",
                "        'name'                  => _x('${1:Post Types}', 'Post type general name', '${3:textdomain}'),",
                "        'singular_name'         => _x('${1:Post Type}', 'Post type singular name', '${3:textdomain}'),",
                "        'menu_name'             => _x('${1:Post Types}', 'Admin Menu text', '${3:textdomain}'),",
                "        'name_admin_bar'        => _x('${1:Post Type}', 'Add New on Toolbar', '${3:textdomain}'),",
                "        'add_new'               => __('Add New', '${3:textdomain}'),",
                "        'add_new_item'          => __('Add New ${1:Post Type}', '${3:textdomain}'),",
                "        'new_item'              => __('New ${1:Post Type}', '${3:textdomain}'),",
                "        'edit_item'             => __('Edit ${1:Post Type}', '${3:textdomain}'),",
                "        'view_item'             => __('View ${1:Post Type}', '${3:textdomain}'),",
                "        'all_items'             => __('All ${1:Post Types}', '${3:textdomain}'),",
                "        'search_items'          => __('Search ${1:Post Types}', '${3:textdomain}'),",
                "        'parent_item_colon'     => __('Parent ${1:Post Types}:', '${3:textdomain}'),",
                "        'not_found'             => __('No ${1:post types} found.', '${3:textdomain}'),",
                "        'not_found_in_trash'    => __('No ${1:post types} found in Trash.', '${3:textdomain}'),",
                "        'featured_image'        => _x('${1:Post Type} Cover Image', 'Overrides the “Featured Image” phrase', '${3:textdomain}'),",
                "        'set_featured_image'    => _x('Set ${1:post type} cover image', '${3:textdomain}'),",
                "        'remove_featured_image' => _x('Remove ${1:post type} cover image', '${3:textdomain}'),",
                "        'use_featured_image'    => _x('Use as ${1:post type} cover image', '${3:textdomain}'),",
                "        'archives'              => _x('${1:Post Type} archives', '${3:textdomain}'),",
                "        'insert_into_item'      => _x('Insert into ${1:post type}', '${3:textdomain}'),",
                "        'uploaded_to_this_item' => _x('Uploaded to this ${1:post type}', '${3:textdomain}'),",
                "        'filter_items_list'     => _x('Filter ${1:post types} list', '${3:textdomain}'),",
                "        'items_list_navigation' => _x('${1:Post Types} list navigation', '${3:textdomain}'),",
                "        'items_list'            => _x('${1:Post Types} list', '${3:textdomain}'),",
                "    );",
                "",
                "    \\$args = array(",
                "        'labels'             => \\$labels,",
                "        'public'             => true,",
                "        'publicly_queryable' => true,",
                "        'show_in_menu'       => true,",
                "        'show_in_rest'       => true,",
                "        'has_archive'        => true,",
                "        'menu_position'      => 5,",
                "        'menu_icon'          => '${4:dashicons-admin-post}',",
                "        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),",
                "        'rewrite'            => array('slug' => '${2:post_type_slug}'),",
                "        'capability_type'    => 'post',",
                "    );",
                "",
                "    register_post_type('${2:post_type_slug}', \\$args);",
                "}",
                "add_action('init', 'register_${2:my}_custom_post_type');"
            ].join('\n')
        },
        "WP: Taxonomy": {
            prefix: "taxonomy",
            detail: "WordPress Snippet",
            documentation: "**Register Custom Taxonomy**\n\nCreates a complete snippet for registering a new custom taxonomy and attaching it to a post type.",
            body: [
                "function register_${2:my}_custom_taxonomy() {",
                "    \\$labels = array(",
                "        'name'                       => _x('${1:Taxonomies}', 'taxonomy general name', '${4:textdomain}'),",
                "        'singular_name'              => _x('${1:Taxonomy}', 'taxonomy singular name', '${4:textdomain}'),",
                "        'search_items'               => __('Search ${1:Taxonomies}', '${4:textdomain}'),",
                "        'popular_items'              => __('Popular ${1:Taxonomies}', '${4:textdomain}'),",
                "        'all_items'                  => __('All ${1:Taxonomies}', '${4:textdomain}'),",
                "        'parent_item'                => __('Parent ${1:Taxonomy}', '${4:textdomain}'),",
                "        'parent_item_colon'          => __('Parent ${1:Taxonomy}:', '${4:textdomain}'),",
                "        'edit_item'                  => __('Edit ${1:Taxonomy}', '${4:textdomain}'),",
                "        'update_item'                => __('Update ${1:Taxonomy}', '${4:textdomain}'),",
                "        'add_new_item'               => __('Add New ${1:Taxonomy}', '${4:textdomain}'),",
                "        'new_item_name'              => __('New ${1:Taxonomy} Name', '${4:textdomain}'),",
                "        'separate_items_with_commas' => __('Separate ${1:taxonomies} with commas', '${4:textdomain}'),",
                "        'add_or_remove_items'        => __('Add or remove ${1:taxonomies}', '${4:textdomain}'),",
                "        'choose_from_most_used'      => __('Choose from the most used ${1:taxonomies}', '${4:textdomain}'),",
                "        'not_found'                  => __('No ${1:taxonomies} found.', '${4:textdomain}'),",
                "        'menu_name'                  => __('${1:Taxonomies}', '${4:textdomain}'),",
                "    );",
                "",
                "    \\$args = array(",
                "        'hierarchical'          => true,",
                "        'labels'                => \\$labels,",
                "        'show_ui'               => true,",
                "        'show_admin_column'     => true,",
                "        'query_var'             => true,",
                "        'show_in_rest'          => true,",
                "        'rewrite'               => array('slug' => '${2:taxonomy_slug}'),",
                "    );",
                "",
                "    register_taxonomy('${2:taxonomy_slug}', array('${3:post_type_slug}'), \\$args);",
                "}",
                "add_action('init', 'register_${2:my}_custom_taxonomy');"
            ].join('\n')
        },



        // --- Basic Fields ---
        "ACF: Text": { prefix: "acf_text", detail: "Basic Field", body: "<?php if ( get_field('${1:text_field}') ) : ?>\n\t<p><?php the_field('${1:text_field}'); ?></p>\n<?php endif; ?>", documentation: "**ACF: Text Field**" },
        "ACF: Textarea": { prefix: "acf_textarea", detail: "Basic Field", body: "<?php if ( get_field('${1:textarea_field}') ) : ?>\n\t<div><?php echo nl2br( get_field('${1:textarea_field}') ); ?></div>\n<?php endif; ?>", documentation: "**ACF: Textarea Field**" },
        "ACF: Number": { prefix: "acf_number", detail: "Basic Field", body: "<?php if ( get_field('${1:number_field}') ) : ?>\n\t<span><?php the_field('${1:number_field}'); ?></span>\n<?php endif; ?>", documentation: "**ACF: Number Field**" },
        "ACF: Range": { prefix: "acf_range", detail: "Basic Field", body: "<?php if ( get_field('${1:range_field}') ) : ?>\n\t<span><?php the_field('${1:range_field}'); ?></span>\n<?php endif; ?>", documentation: "**ACF: Range Field**" },
        "ACF: Email": { prefix: "acf_email", detail: "Basic Field", body: "<?php if ( get_field('${1:email_field}') ) : ?>\n\t<a href=\"mailto:<?php the_field('${1:email_field}'); ?>\"><?php the_field('${1:email_field}'); ?></a>\n<?php endif; ?>", documentation: "**ACF: Email Field**" },
        "ACF: URL": { prefix: "acf_url", detail: "Basic Field", body: "<?php if ( get_field('${1:url_field}') ) : ?>\n\t<a href=\"<?php the_field('${1:url_field}'); ?>\" target=\"_blank\">Visit Link</a>\n<?php endif; ?>", documentation: "**ACF: URL Field**" },
        "ACF: Password": { prefix: "acf_password", detail: "Basic Field", body: "<?php if ( get_field('${1:password_field}') ) : ?>\n\t<p>Password is set.</p>\n<?php endif; ?>", documentation: "**ACF: Password Field**" },

        // --- Content Fields ---
        "ACF: Image": { prefix: "acf_image", detail: "Content Field", body: "<?php \n\\$image = get_field('${1:image_field}');\nif ( \\$image ) : ?>\n\t<img src=\"<?php echo esc_url(\\$image['url']); ?>\" alt=\"<?php echo esc_attr(\\$image['alt']); ?>\" />\n<?php endif; ?>", documentation: "**ACF: Image Field** (Return: Array)" },
        "ACF: File": { prefix: "acf_file", detail: "Content Field", body: "<?php \n\\$file = get_field('${1:file_field}');\nif ( \\$file ) : ?>\n\t<a href=\"<?php echo esc_url(\\$file['url']); ?>\" download><?php echo esc_html(\\$file['title']); ?></a>\n<?php endif; ?>", documentation: "**ACF: File Field**" },
        "ACF: Wysiwyg Editor": { prefix: "acf_wysiwyg", detail: "Content Field", body: "<?php if ( get_field('${1:wysiwyg_field}') ) : ?>\n\t<div class=\"wysiwyg-content\">\n\t\t<?php the_field('${1:wysiwyg_field}'); ?>\n\t</div>\n<?php endif; ?>", documentation: "**ACF: Wysiwyg Editor**" },
        "ACF: oEmbed": { prefix: "acf_oembed", detail: "Content Field", body: "<?php if ( get_field('${1:oembed_field}') ) : ?>\n\t<div class=\"embed-container\">\n\t\t<?php the_field('${1:oembed_field}'); ?>\n\t</div>\n<?php endif; ?>", documentation: "**ACF: oEmbed Field**" },

        // --- Choice Fields ---
        "ACF: Select": { prefix: "acf_select", detail: "Choice Field", body: "<?php if ( get_field('${1:select_field}') ) : ?>\n\t<p>Selected: <?php the_field('${1:select_field}'); ?></p>\n<?php endif; ?>", documentation: "**ACF: Select Field**" },
        "ACF: Checkbox": { prefix: "acf_checkbox", detail: "Choice Field", body: "<?php \n\\$checkbox_values = get_field('${1:checkbox_field}');\nif ( \\$checkbox_values ) : ?>\n\t<ul>\n\t<?php foreach ( \\$checkbox_values as \\$value ) : ?>\n\t\t<li><?php echo esc_html( \\$value ); ?></li>\n\t<?php endforeach; ?>\n\t</ul>\n<?php endif; ?>", documentation: "**ACF: Checkbox Field**" },
        "ACF: Radio Button": { prefix: "acf_radio", detail: "Choice Field", body: "<?php if ( get_field('${1:radio_field}') ) : ?>\n\t<p>Selected: <?php the_field('${1:radio_field}'); ?></p>\n<?php endif; ?>", documentation: "**ACF: Radio Button**" },
        "ACF: Button Group": { prefix: "acf_button_group", detail: "Choice Field", body: "<?php if ( get_field('${1:button_group_field}') ) : ?>\n\t<p>Selected: <?php the_field('${1:button_group_field}'); ?></p>\n<?php endif; ?>", documentation: "**ACF: Button Group**" },
        "ACF: True / False": { prefix: "acf_true_false", detail: "Choice Field", body: "<?php if ( get_field('${1:true_false_field}') ) : ?>\n\t<p>This is true.</p>\n<?php else : ?>\n\t<p>This is false.</p>\n<?php endif; ?>", documentation: "**ACF: True / False Field**" },

        // --- Relational Fields ---
        "ACF: Link": { prefix: "acf_link", detail: "Relational Field", body: "<?php \n\\$link = get_field('${1:link_field}');\nif ( \\$link ) :\n\t\\$link_url = \\$link['url'];\n\t\\$link_title = \\$link['title'];\n\t\\$link_target = \\$link['target'] ? \\$link['target'] : '_self';\n?>\n\t<a href=\"<?php echo esc_url(\\$link_url); ?>\" target=\"<?php echo esc_attr(\\$link_target); ?>\"><?php echo esc_html(\\$link_title); ?></a>\n<?php endif; ?>", documentation: "**ACF: Link Field**" },
        "ACF: Post Object": { prefix: "acf_post_object", detail: "Relational Field", body: "<?php\n\\$post_object = get_field('${1:post_object_field}');\nif ( \\$post_object ) :\n\tglobal \\$post;\n\t\\$post = \\$post_object;\n\tsetup_postdata( \\$post ); \n?>\n\t<h3><a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a></h3>\n<?php \n\twp_reset_postdata(); \nendif; \n?>", documentation: "**ACF: Post Object** (Single)" },
        "ACF: Page Link": { prefix: "acf_page_link", detail: "Relational Field", body: "<?php if ( get_field('${1:page_link_field}') ) : ?>\n\t<a href=\"<?php the_field('${1:page_link_field}'); ?>\">Visit Page</a>\n<?php endif; ?>", documentation: "**ACF: Page Link**" },
        "ACF: Relationship": { prefix: "acf_relationship", detail: "Relational Field", body: "<?php\n\\$posts = get_field('${1:relationship_field}');\nif ( \\$posts ) : ?>\n\t<ul>\n\t<?php foreach ( \\$posts as \\$post ) : setup_postdata(\\$post); ?>\n\t\t<li><a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a></li>\n\t<?php endforeach; ?>\n\t</ul>\n\t<?php wp_reset_postdata(); ?>\n<?php endif; ?>", documentation: "**ACF: Relationship** (Multiple)" },
        "ACF: Taxonomy": { prefix: "acf_taxonomy", detail: "Relational Field", body: "<?php\n\\$term = get_field('${1:taxonomy_field}');\nif ( \\$term ) : ?>\n\t<h3><a href=\"<?php echo esc_url( get_term_link( \\$term ) ); ?>\"><?php echo esc_html( \\$term->name ); ?></a></h3>\n<?php endif; ?>", documentation: "**ACF: Taxonomy**" },
        "ACF: User": { prefix: "acf_user", detail: "Relational Field", body: "<?php\n\\$user = get_field('${1:user_field}');\nif ( \\$user ) : ?>\n\t<p>User: <?php echo esc_html( \\$user['display_name'] ); ?></p>\n<?php endif; ?>", documentation: "**ACF: User**" },

        // --- Date and Time Fields ---
        "ACF: Date Picker": { prefix: "acf_date_picker", detail: "Date & Time Field", body: "<?php if ( get_field('${1:date_picker_field}') ) : ?>\n\t<time><?php the_field('${1:date_picker_field}'); ?></time>\n<?php endif; ?>", documentation: "**ACF: Date Picker**" },
        "ACF: Date Time Picker": { prefix: "acf_datetime_picker", detail: "Date & Time Field", body: "<?php if ( get_field('${1:datetime_picker_field}') ) : ?>\n\t<time><?php the_field('${1:datetime_picker_field}'); ?></time>\n<?php endif; ?>", documentation: "**ACF: Date Time Picker**" },
        "ACF: Time Picker": { prefix: "acf_time_picker", detail: "Date & Time Field", body: "<?php if ( get_field('${1:time_picker_field}') ) : ?>\n\t<span><?php the_field('${1:time_picker_field}'); ?></span>\n<?php endif; ?>", documentation: "**ACF: Time Picker**" },

        // --- ACF Pro Fields ---
        "ACF: Repeater": { prefix: "acf_repeater", detail: "Layout Field (Pro)", body: "<?php if ( have_rows('${1:repeater_field}') ) : ?>\n\t<?php while ( have_rows('${1:repeater_field}') ) : the_row(); ?>\n\t\t<?php the_sub_field('${2:sub_field}'); ?>\n\t<?php endwhile; ?>\n<?php endif; ?>", documentation: "**ACF Pro: Repeater Field**" },
        "ACF: Flexible Content": { prefix: "acf_flexible", detail: "Layout Field (Pro)", body: "<?php if ( have_rows('${1:flexible_content_field}') ) : ?>\n\t<?php while ( have_rows('${1:flexible_content_field}') ) : the_row(); ?>\n\t\t<?php if ( get_row_layout() == '${2:layout_name}' ) : ?>\n\t\t\t<?php the_sub_field('${3:sub_field}'); ?>\n\t\t<?php endif; ?>\n\t<?php endwhile; ?>\n<?php endif; ?>", documentation: "**ACF Pro: Flexible Content**" },
        "ACF: Gallery": { prefix: "acf_gallery", detail: "Content Field (Pro)", body: "<?php \n\\$images = get_field('${1:gallery_field}');\nif ( \\$images ) : ?>\n\t<div class=\"gallery\">\n\t<?php foreach ( \\$images as \\$image ) : ?>\n\t\t<a href=\"<?php echo esc_url(\\$image['url']); ?>\">\n\t\t\t<img src=\"<?php echo esc_url(\\$image['sizes']['thumbnail']); ?>\" alt=\"<?php echo esc_attr(\\$image['alt']); ?>\" />\n\t\t</a>\n\t<?php endforeach; ?>\n\t</div>\n<?php endif; ?>", documentation: "**ACF Pro: Gallery Field**" },
        "ACF: Group": { prefix: "acf_group", detail: "Layout Field (Pro)", body: "<?php \n\\$group = get_field('${1:group_field}');\nif ( \\$group ) : ?>\n\t<div><?php echo esc_html( \\$group['${2:sub_field}'] ); ?></div>\n<?php endif; ?>", documentation: "**ACF Pro: Group Field**" },
        "ACF: Clone": { prefix: "acf_clone", detail: "Layout Field (Pro)", body: "<?php // Cloned fields are accessed like normal fields. ?>\n<?php the_field('${1:cloned_field_name}'); ?>", documentation: "**ACF Pro: Clone Field**" },

        // --- Utility Fields ---
        "ACF: Google Map": { prefix: "acf_map", detail: "Utility Field", body: "<?php \n\\$location = get_field('${1:map_field}');\nif ( \\$location ) : ?>\n\t<div class=\"acf-map\" data-zoom=\"16\">\n\t\t<div class=\"marker\" data-lat=\"<?php echo esc_attr(\\$location['lat']); ?>\" data-lng=\"<?php echo esc_attr(\\$location['lng']); ?>\"></div>\n\t</div>\n<?php endif; ?>", documentation: "**ACF: Google Map**" },
        "ACF: Color Picker": { prefix: "acf_color_picker", detail: "Utility Field", body: "<?php if ( get_field('${1:color_picker_field}') ) : ?>\n\t<div style=\"background-color: <?php the_field('${1:color_picker_field}'); ?>;\"></div>\n<?php endif; ?>", documentation: "**ACF: Color Picker**" },
        "ACF: Accordion": { prefix: "acf_accordion", detail: "Utility Field", body: "<?php // Accordion is for admin UI only. No template code needed. ?>", documentation: "**ACF: Accordion**" },
        "ACF: Tab": { prefix: "acf_tab", detail: "Utility Field", body: "<?php // Tab is for admin UI only. No template code needed. ?>", documentation: "**ACF: Tab**" },
        "ACF: Message": { prefix: "acf_message", detail: "Utility Field", body: "<?php // Message is for admin UI only. No template code needed. ?>", documentation: "**ACF: Message**" },
        "ACF: Hidden": { prefix: "acf_hidden", detail: "Utility Field", body: "<?php if( get_field('${1:hidden_field}') ): ?>\n\t<p>Hidden value: <?php the_field('${1:hidden_field}'); ?></p>\n<?php endif; ?>", documentation: "**ACF: Hidden Field**" }
    };

    return Object.entries(snippetsData).map(([label, data]) => {
        return createCompletionItem({ label, ...data });
    });
}

function register(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        ['php', 'html'],
        {
            provideCompletionItems() {
                return getAcfSnippets();
            }
        }
    );
    context.subscriptions.push(provider);
}

module.exports = { register };


