<?php
if (!defined('ABSPATH')) exit;
?>
<div id="wp-gemini-chat-widget" class="wp-gemini-chat-widget">
    <button id="wp-gemini-chat-toggle" class="wp-gemini-chat-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    </button>
    
    <div id="wp-gemini-chat-popup" class="wp-gemini-chat-popup">
        <div class="wp-gemini-chat-header">
            <h3>Chat with AI Assistant</h3>
            <button id="wp-gemini-chat-close" class="wp-gemini-chat-close">&times;</button>
        </div>
        
        <div id="wp-gemini-chat-messages" class="wp-gemini-chat-messages"></div>
        
        <form id="wp-gemini-chat-form" class="wp-gemini-chat-form">
            <input type="text" id="wp-gemini-chat-input" placeholder="Type your message..." required>
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </form>
    </div>
</div>