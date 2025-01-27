<?php
/**
 * Plugin Name: WP Gemini Chat
 * Plugin URI: https://example.com/wp-gemini-chat
 * Description: A WordPress plugin that adds a floating chat widget powered by Google's Gemini AI
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: wp-gemini-chat
 */

if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('WP_GEMINI_CHAT_VERSION', '1.0.0');
define('WP_GEMINI_CHAT_PATH', plugin_dir_path(__FILE__));
define('WP_GEMINI_CHAT_URL', plugin_dir_url(__FILE__));

// Include required files
require_once WP_GEMINI_CHAT_PATH . 'includes/class-wp-gemini-chat.php';
require_once WP_GEMINI_CHAT_PATH . 'includes/class-wp-gemini-chat-api.php';

// Initialize the plugin
function wp_gemini_chat_init() {
    $plugin = new WP_Gemini_Chat();
    $plugin->init();
}
add_action('plugins_loaded', 'wp_gemini_chat_init');