INSERT INTO messages (sender_id, recipient_id, body)
VALUES 
(1, 2, '1 to 2'),
(2, 1, '2 to 1'),
(1, 3, '1 to 3'),
(2, 3, '2 to 3'),
(3, 1, '3 to 1'),
(3, 2, '3 to 2');

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