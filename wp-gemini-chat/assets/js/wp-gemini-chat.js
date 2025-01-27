jQuery(document).ready(function($) {
    // DOM elements
    const widget = $('#wp-gemini-chat-widget');
    const toggle = $('#wp-gemini-chat-toggle');
    const popup = $('#wp-gemini-chat-popup');
    const close = $('#wp-gemini-chat-close');
    const messages = $('#wp-gemini-chat-messages');
    const form = $('#wp-gemini-chat-form');
    const input = $('#wp-gemini-chat-input');
    let isSubmitting = false;

    // Toggle chat popup
    toggle.on('click', function() {
        popup.toggleClass('active');
        if (popup.hasClass('active')) {
            input.focus();
        }
    });

    // Close chat popup
    close.on('click', function() {
        popup.removeClass('active');
    });

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = $('<div>')
            .addClass('wp-gemini-chat-message')
            .addClass(isUser ? 'user' : 'bot')
            .text(message);
        
        messages.append(messageDiv);
        messages.scrollTop(messages[0].scrollHeight);
    }

    // Show loading indicator
    function showLoading() {
        const loadingDiv = $('<div>')
            .addClass('wp-gemini-chat-message bot loading')
            .text('Thinking...');
        messages.append(loadingDiv);
        messages.scrollTop(messages[0].scrollHeight);
        return loadingDiv;
    }

    // Handle form submission
    form.on('submit', function(e) {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isSubmitting) return;
        
        const message = input.val().trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        input.val('').focus();

        // Show loading indicator
        isSubmitting = true;
        const loadingDiv = showLoading();
        
        // Disable input while processing
        input.prop('disabled', true);

        // Send message to server
        $.ajax({
            url: wpGeminiChat.ajaxUrl,
            type: 'POST',
            data: {
                action: 'wp_gemini_chat_message',
                nonce: wpGeminiChat.nonce,
                message: message
            },
            success: function(response) {
                loadingDiv.remove();
                if (response.success) {
                    addMessage(response.data.response);
                } else {
                    addMessage(response.data.message || 'Sorry, something went wrong. Please try again.');
                }
            },
            error: function(xhr) {
                loadingDiv.remove();
                let errorMessage = 'Sorry, there was an error communicating with the server.';
                if (xhr.responseJSON && xhr.responseJSON.data && xhr.responseJSON.data.message) {
                    errorMessage = xhr.responseJSON.data.message;
                }
                addMessage(errorMessage);
            },
            complete: function() {
                isSubmitting = false;
                input.prop('disabled', false).focus();
            }
        });
    });

    // Add initial greeting
    addMessage('Hello! How can I help you today?');
});