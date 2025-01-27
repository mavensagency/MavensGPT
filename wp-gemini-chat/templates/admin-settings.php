<?php
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
    <h1>WP Gemini Chat Settings</h1>
    
    <form method="post" action="options.php">
        <?php settings_fields('wp_gemini_chat_settings'); ?>
        <?php do_settings_sections('wp_gemini_chat_settings'); ?>
        
        <table class="form-table">
            <tr valign="top">
                <th scope="row">Gemini API Key</th>
                <td>
                    <input type="text" 
                           name="wp_gemini_chat_api_key" 
                           value="<?php echo esc_attr(get_option('wp_gemini_chat_api_key')); ?>" 
                           class="regular-text">
                    <p class="description">Enter your Gemini AI API key here. You can get one from the <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a>.</p>
                </td>
            </tr>
        </table>
        
        <?php submit_button(); ?>
    </form>
</div>