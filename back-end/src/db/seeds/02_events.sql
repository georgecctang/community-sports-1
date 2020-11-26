INSERT INTO events (owner_id , date, start_time, end_time, title,
address, city, province, current_participants, max_participants, skill_level, 
gender_restriction, referee, additional_info, location) 
VALUES (1, '2020-12-23', '12:30:00', '14:00:00', 'Weekly Tennis Execerise!', '4750 Jane St', 'Toronto', 'Ontario', 1, 22, 'Open', 'Female Only', FALSE, 'Hi! I do this weekly and love to meet to gal pals :D', point(43.770570, -79.521410)),
(2,'2020-12-03', '18:00:00', '21:00:00', 'Great Tennis Match', '24 Darrell Ave', 'Toronto', 'Ontario', 2, 30, 'Beginner', 'None', FALSE, 'Please bring your own tennis rackets.', point(43.682130, -79.310430)),
(4, '2020-11-20', '10:00:00', '12:30:00','Tennis For Beginners', '134 Indian Grove', 'Toronto', 'Ontario', 22, 45, 'Beginner', 'Other Only', False, 'Just have fun!', point(43.655350, -79.459240));