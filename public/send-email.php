<?php
// DesignOPack Quote Request Email Handler
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize input
$name = htmlspecialchars($input['name']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($input['phone'] ?? 'Not provided');
$product = htmlspecialchars($input['product'] ?? 'General Inquiry');
$message = htmlspecialchars($input['message']);
$type = htmlspecialchars($input['type'] ?? 'Quote Request');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Email configuration
$to = 'rastogimehak3845@gmail.com';
$subject = "New $type from $name - DesignOPack Website";

// Email body
$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #8B5A2B; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8B5A2B; }
        .value { margin-left: 10px; }
        .footer { padding: 15px; background-color: #333; color: white; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='header'>
        <h2>New $type - DesignOPack</h2>
    </div>
    <div class='content'>
        <div class='field'>
            <span class='label'>Name:</span>
            <span class='value'>$name</span>
        </div>
        <div class='field'>
            <span class='label'>Email:</span>
            <span class='value'>$email</span>
        </div>
        <div class='field'>
            <span class='label'>Phone:</span>
            <span class='value'>$phone</span>
        </div>
        <div class='field'>
            <span class='label'>Product Interest:</span>
            <span class='value'>$product</span>
        </div>
        <div class='field'>
            <span class='label'>Message:</span>
            <div style='background: white; padding: 15px; border-left: 4px solid #8B5A2B; margin-top: 10px;'>
                " . nl2br($message) . "
            </div>
        </div>
    </div>
    <div class='footer'>
        <p>This email was sent from your DesignOPack website contact form.</p>
        <p>Submitted on: " . date('Y-m-d H:i:s') . "</p>
    </div>
</body>
</html>
";

// Email headers
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: DesignOPack Website <no-reply@designopack.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
);

// Send email
$mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Email sent successfully to rastogimehak3845@gmail.com'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again.'
    ]);
}
?>