<?php
class WP_Gemini_Chat_API {
    private $api_key;

    public function __construct() {
        $this->api_key = get_option('wp_gemini_chat_api_key');
        add_action('wp_ajax_wp_gemini_chat_message', array($this, 'handle_message'));
        add_action('wp_ajax_nopriv_wp_gemini_chat_message', array($this, 'handle_message'));
    }

    public function handle_message() {
        try {
            // Verify nonce
            if (!check_ajax_referer('wp_gemini_chat_nonce', 'nonce', false)) {
                throw new Exception('Invalid security token.');
            }

            // Verify message exists
            if (!isset($_POST['message'])) {
                throw new Exception('No message provided.');
            }

            // Verify API key is set
            if (empty($this->api_key)) {
                throw new Exception('API key not configured. Please set up your Gemini API key in the plugin settings.');
            }

            $message = sanitize_text_field($_POST['message']);
            
            // Call Gemini API
            $response = $this->call_gemini_api($message);
            
            wp_send_json_success(array(
                'response' => $response
            ));
        } catch (Exception $e) {
            wp_send_json_error(array(
                'message' => $e->getMessage()
            ));
        }
    }

    private function call_gemini_api($message) {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        $args = array(
            'timeout' => 15,
            'headers' => array(
                'Content-Type' => 'application/json',
                'x-goog-api-key' => $this->api_key
            ),
            'body' => json_encode(array(
                'contents' => array(
                    array(
                        'parts' => array(
                            array('text' => $message)
                        )
                    )
                ),
                'generationConfig' => array(
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 1024,
                )
            ))
        );

        $response = wp_remote_post($url, $args);

        if (is_wp_error($response)) {
            throw new Exception($response->get_error_message());
        }

        $status_code = wp_remote_retrieve_response_code($response);
        if ($status_code !== 200) {
            $body = json_decode(wp_remote_retrieve_body($response), true);
            $error_message = isset($body['error']['message']) 
                ? $body['error']['message'] 
                : 'API request failed with status code: ' . $status_code;
            throw new Exception($error_message);
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        
        if (!isset($body['candidates'][0]['content']['parts'][0]['text'])) {
            throw new Exception('Invalid response format from API');
        }

        return $body['candidates'][0]['content']['parts'][0]['text'];
    }
}