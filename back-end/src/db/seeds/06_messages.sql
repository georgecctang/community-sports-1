INSERT INTO messages (sender_id, recipient_id, body)
VALUES 
(1, 2, 'Hi Terry!'),
(2, 1, 'Hey Tam!!'),
(1, 3, 'Yo Sara!!'),
(2, 3, 'Hi Sara!'),
(3, 1, 'Hi Tam, nice to meet you!'),
(3, 2, 'Hey Terry!!!');

INSERT INTO message_user (message_id, user_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 1),
(3, 1),
(3, 3),
(4, 2),
(4, 3),
(5, 3),
(5, 1),
(6, 3),
(6, 2);