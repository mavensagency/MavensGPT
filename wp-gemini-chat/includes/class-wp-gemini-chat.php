<?php
class WP_Gemini_Chat {
    public function init() {
        // Register hooks
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_chat_widget'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    public function enqueue_scripts() {
        wp_enqueue_style(
            'wp-gemini-chat',
            WP_GEMINI_CHAT_URL . 'assets/css/wp-gemini-chat.css',
            array(),
            WP_GEMINI_CHAT_VERSION
        );

        wp_enqueue_script(
            'wp-gemini-chat',
            WP_GEMINI_CHAT_URL . 'assets/js/wp-gemini-chat.js',
            array('jquery'),
            WP_GEMINI_CHAT_VERSION,
            true
        );

        wp_localize_script('wp-gemini-chat', 'wpGeminiChat', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wp_gemini_chat_nonce'),
        ));
    }

    public function render_chat_widget() {
        include WP_GEMINI_CHAT_PATH . 'templates/chat-widget.php';
    }

    public function add_admin_menu() {
        add_options_page(
            'WP Gemini Chat Settings',
            'Gemini Chat',
            'manage_options',
            'wp-gemini-chat',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('wp_gemini_chat_settings', 'wp_gemini_chat_api_key');
    }

    public function render_settings_page() {
        include WP_GEMINI_CHAT_PATH . 'templates/admin-settings.php';
    }
}