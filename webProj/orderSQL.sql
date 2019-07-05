CREATE TABLE IF NOT EXISTS `order` (
`oid` int(`order`6) NOT NULL,
`name` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`cellnumber` varchar(50) NOT NULL,
`odate` DATETIME  NOT NULL,
`meat` varchar(255),
`veggie` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `order` VALUES
(22222, '李奧納多', 'Leo@google.com', '0931234567', '1990-09-13 12:05:03','h','rp' ),
(33333, '拉斐爾', 'Raph@google.com', '0939345237', '1992-09-13 19:05:03','p','grop' ),
(44444, '多納太羅', 'Don@google.com', '0945772342', '1993-09-13 04:05:03','hp','p' ),
(55555, '米開朗基羅', 'Mikey@google.com', '0931234567', '1990-09-13 12:05:03','hp','gr' );

ALTER TABLE `order`
ADD PRIMARY KEY (`oid`),
ADD UNIQUE KEY `email` (`email`);