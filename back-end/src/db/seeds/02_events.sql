INSERT INTO events (owner_id , date, start_time, end_time, title,
address, city, province, current_participants, max_participants, skill_level, 
gender_restriction, referee, additional_info, location) 
VALUES (1, '2020-12-23', '12:30:00', '14:00:00', 'Casual Soccer Game', '2525 Alta Vista Dr', 'Ottawa', 'Ontario', 1, 22,  'Beginner', 'None', FALSE, 'This is a very casual game. Feel free to play in running shows if you would like.', point(45.378200, -75.659160)),
(2,'2020-12-04', '18:00:00', '21:00:00', 'Experts Night', '1900 Dauphin Rd', 'Ottawa', 'Ontario', 2,  30, 'Advanced', 'None', TRUE, 'This is for experienced soccer players. Please bring some extra balls for warm up. No position changes are allowed last minute.', point(45.397780, -75.639490)),
(4, '2020-11-20', '10:00:00', '12:30:00','Womens Soccer in the Morning', '198 Corkstown Rd', 'Ottawa', 'Ontario', 22, 45, 'Intermediate', 'Female Only', False, 'I have field 2 booked. The event is goin on rain or shine!', point(45.345350, -75.827870)),
(27, '2020-12-05', '16:00:00', '18:30:00','Social Soccer Club', '1662 Bearbrook Rd', 'Ottawa', 'Ontario', 20, 40, 'Beginner', 'None', FALSE, 'Its too cold out so I rented a dome. Bring snacks for after the game.', point(45.437080, -75.567450)),
(20, '2020-12-08', '12:00:00', '13:00:00','Lunch Time Soccer at Central Tech', '725 Bathurst St', 'Toronto', 'Ontario', 4, 40, 'Open', 'None', TRUE, 'Come play soccer on lunch break at the beautiful Centreal Tech stadium.', point(43.662918, -79.4088986)),
(19, '2020-12-04', '16:00:00', '18:00:00','York U Soccer Club', 'Northwest Gate', 'Toronto', 'Ontario', 1, 40, 'Open', 'None', TRUE, 'Looking for more players to join. Non York students will need to register at the athletic desk before coming on the field.', point(43.777278900146484, -79.51079559326172)),
(16, '2020-12-15', '19:00:00', '22:00:00','Toronto FC Open Tryouts', '170 Princes Blvd', 'Toronto', 'Ontario', 0, 40, 'Open', 'Advanced', TRUE, 'Toronto FC scouts will be watching to look for prospects.', point(43.6328332, -79.4228844)),
(25, '2020-12-20', '19:00:00', '22:00:00','Niagara Womens Soccer Night', '3710 Sinnicks Ave', 'Niagara Falls', 'Ontario', 13, 40, 'Open', 'None', FALSE, 'We meet every week! Join the fun.', point(43.121681213378906, -79.09493255615234)),
(22, '2020-12-22', '19:00:00', '22:00:00','Niagara Mens Soccer Night', '6775 Kalar Road', 'Niagara Falls', 'Ontario', 14, 40, 'Men Only', 'Beginner', FALSE, 'We meet every week! Come for the soccer stay for the beer.', point(43.0765936,-79.1358038)),
(26, '2020-12-01', '16:00:00', '18:00:00','Goalie Looking For Practice', '5720 Dorchester Road', 'Niagara Falls', 'Ontario', 1, 2, 'Open', 'Advanced', FALSE, 'Hi I am a goalie looking for practice. I need someone that wants to come shoot on me!', point(43.0911191,-79.1104665));

