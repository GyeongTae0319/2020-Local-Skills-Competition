-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 20-06-16 14:42
-- 서버 버전: 10.4.11-MariaDB
-- PHP 버전: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `db_0606`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `choice`
--

CREATE TABLE `choice` (
  `idx` int(11) NOT NULL,
  `request_idx` int(11) NOT NULL,
  `estimate_idx` int(11) NOT NULL,
  `specialist_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `choice`
--

INSERT INTO `choice` (`idx`, `request_idx`, `estimate_idx`, `specialist_id`) VALUES
(20, 1, 1, 'specialist1'),
(21, 3, 2, 'specialist2');

-- --------------------------------------------------------

--
-- 테이블 구조 `estimate`
--

CREATE TABLE `estimate` (
  `idx` int(11) NOT NULL,
  `request_idx` int(11) NOT NULL,
  `specialist_id` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `estimate`
--

INSERT INTO `estimate` (`idx`, `request_idx`, `specialist_id`, `price`) VALUES
(1, 1, 'specialist1', 456),
(2, 3, 'specialist2', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `grade`
--

CREATE TABLE `grade` (
  `idx` int(11) NOT NULL,
  `housewarming_idx` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `grade_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `grade`
--

INSERT INTO `grade` (`idx`, `housewarming_idx`, `user_id`, `grade_num`) VALUES
(2, 2, 'user2', 2),
(3, 2, 'user3', 3),
(4, 3, 'user3', 5),
(5, 3, 'user2', 2);

-- --------------------------------------------------------

--
-- 테이블 구조 `housewarming_party`
--

CREATE TABLE `housewarming_party` (
  `idx` int(11) NOT NULL,
  `before_photo` varchar(255) NOT NULL,
  `after_photo` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `housewarming_party`
--

INSERT INTO `housewarming_party` (`idx`, `before_photo`, `after_photo`, `user_name`, `user_id`, `date`, `description`) VALUES
(1, '1555545202_before_adorable-1866530_1920.jpg', '1891237747_after_adult-2178440_1920.jpg', '유저1', 'user1', '2020-06-15', 'asd'),
(2, '1493276910_before_apartment-lounge-3147892_1920.jpg', '177401867_after_beard-1845166_1920.jpg', '유저1', 'user1', '2020-06-15', 'asd'),
(3, '59842948_before_design-1162241_1920.jpg', '1766275073_after_chair-4070161_1920.png', '유저1', 'user1', '2020-06-15', 'aaaaa');

-- --------------------------------------------------------

--
-- 테이블 구조 `request`
--

CREATE TABLE `request` (
  `idx` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `request`
--

INSERT INTO `request` (`idx`, `user_id`, `user_name`, `date`, `description`) VALUES
(1, 'user2', '유저2', '2020-06-11', 'asd'),
(2, 'user1', '유저1', '2020-06-01', 'wqeqwe'),
(3, 'user1', '유저1', '2020-06-13', 'sdfsd');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(11) NOT NULL,
  `specialist_id` varchar(255) NOT NULL,
  `specialist_name` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `grade_num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `specialist_id`, `specialist_name`, `user_id`, `user_name`, `price`, `description`, `grade_num`) VALUES
(2, 'specialist1', '전문가1', 'user2', '유저2', 1000, '내용1', 2),
(3, 'specialist3', '전문가3', 'user2', '유저2', 2000, 'sodyd2', 4),
(4, 'specialist1', '전문가1', 'user2', '유저2', 33, '3333', 3),
(5, 'specialist1', '전문가1', 'user2', '유저2', 1, '11', 5),
(6, 'specialist3', '전문가3', 'user2', '유저2', 1, '1', 2),
(7, 'specialist1', '전문가1', 'user2', '유저2', 12, '12', 2),
(8, 'specialist2', '전문가2', 'user2', '유저2', 43, '4', 5),
(9, 'specialist2', '전문가2', 'user2', '유저2', 1231, '23', 4);

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_photo` varchar(255) NOT NULL,
  `user_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`user_id`, `user_password`, `user_name`, `user_photo`, `user_level`) VALUES
('asdasda', '3f76818f507fe7eb6422bd0703c64c88', 'dsadsa', '1600760346_Sketchpad.png', 0),
('specialist1', '81dc9bdb52d04dc20036dbd8313ed055', '전문가1', 'specialist1.jpg', 1),
('specialist2', '81dc9bdb52d04dc20036dbd8313ed055', '전문가2', 'specialist2.jpg', 1),
('specialist3', '81dc9bdb52d04dc20036dbd8313ed055', '전문가3', 'specialist3.jpg', 1),
('specialist4', '81dc9bdb52d04dc20036dbd8313ed055', '전문가4', 'specialist4.jpg', 1),
('user1', 'c4ca4238a0b923820dcc509a6f75849b', '유저1', '1633377074_Sketchpad.png', 0),
('user2', 'c81e728d9d4c2f636f067f89cc14862c', '유저2', '107414274_Sketchpad.png', 0),
('user3', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '유저3', '201262385_Sketchpad.png', 0);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `choice`
--
ALTER TABLE `choice`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `estimate`
--
ALTER TABLE `estimate`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `housewarming_party`
--
ALTER TABLE `housewarming_party`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `choice`
--
ALTER TABLE `choice`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 테이블의 AUTO_INCREMENT `estimate`
--
ALTER TABLE `estimate`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `grade`
--
ALTER TABLE `grade`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `housewarming_party`
--
ALTER TABLE `housewarming_party`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `request`
--
ALTER TABLE `request`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
