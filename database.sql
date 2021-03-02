CREATE TABLE customers(
    customer_id INT NOT NULL AUTO_INCREMENT,    
    address_line_1 VARCHAR(30),
    address_line_2 VARCHAR(30),
    address_line_3 VARCHAR(30),
    primary_email VARCHAR(50),
    primary_contact_no VARCHAR(10), 
    customer_type INT NOT NULL, 
    is_active INT NOT NULL,
    PRIMARY KEY(customer_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='customers';

INSERT INTO `customers` (`customer_id`, `address_line_1`, `address_line_2`, `address_line_3`, `primary_email`, `primary_contact_no`, `customer_type`, `is_active`) VALUES
(1,'1st cross street', 'Germantown', 'Victoria', 'OliverJake@gmail.com', '1234567891',1,  0),
(2,'Park Avenue', 'Florida', 'Marktown', 'AmeliaMargaret@gmail.com', '9876543211',1, 0),
(3,'Queens Street', 'Parktown', 'Queensland', 'DamianWilliam@ymail.com', '5432167891',1,0),
(4,'Griffith Road', 'Brisbaner', 'Geogiana', 'IslaBethany@outlook.com', '1233214569',1,0),
(5,'Nathan Circular', 'Briginton', 'Griffith', 'info@uog.sh', '1234543211',2,0);


CREATE TABLE individuals(
    customer_id INT NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    middle_name VARCHAR(20),
    nic VARCHAR(12),
    dob DATE,
    gender INT(1),
    PRIMARY KEY(customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='individuals';

INSERT INTO `individuals` (`customer_id`, `first_name`, `last_name`, `middle_name`, `nic`, `dob`, `gender`) VALUES
(1, 'Oliver', 'Jake', 'Noah', '123456789V', '1992-01-02', '1'),
(2, 'Amelia', 'Emma', 'Margaret', '987654321V', '2000-01-15', '2'),
(3, 'William', 'Damian', 'Daniel', '123454321V', '1969-01-12', '1'),
(4, 'Isla', 'Bethany', 'Sophia', '973611178V', '1989-08-15', '2');

CREATE TABLE organizations(
    customer_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    bussiness_registration_number VARCHAR(20),
    PRIMARY KEY(customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='organizations';

INSERT INTO `organizations` (`customer_id`, `name`, `bussiness_registration_number`) VALUES
(5, 'University of Griffith', '22601929');


CREATE TABLE customer_logins(
    customer_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    recovery_contact_no VARCHAR(10) NOT NULL,
    recovery_email VARCHAR(50) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(username),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='customer_logins';

INSERT INTO `customer_logins` (`customer_id`, `username`, `password`, `recovery_contact_no`, `recovery_email`, `last_login`) VALUES
(1, 'Customer', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '1234567891', 'OliverJake@gmail.com', '2020-01-02 00:19:56'),
(2, 'ameliaemma', '8cb2237d0679ca88db6464eac60da96345513964', '9876543211', 'AmeliaMargaret@gmail.com', '2020-01-01 00:19:56'),
(3, 'williamdamian', '8cb2237d0679ca88db6464eac60da96345513964', '5432167891', 'DamianWilliam@ymail.com', '2020-01-05 00:19:56'),
(4, 'bethanysophia', '348162101fc6f7e624681b7400b085eeac6df7bd', '1233214569', 'IslaBethany@outlook.com', '2020-01-04 00:19:56');



CREATE TABLE branches(
    branch_id INT NOT NULL AUTO_INCREMENT,
    is_active INT NOT NULL,
    branch_name VARCHAR(20),
    location VARCHAR(20),
    PRIMARY KEY(branch_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='branches';
ALTER TABLE branches AUTO_INCREMENT=1;

INSERT INTO branches(is_active,branch_name,location)  VALUES
(0,'Head Office Victoria','Victoria'),
(0,'Anse A La Mouche','Anse A La Mouche'),
(0,'Anse Aux Pins','Anse Aux Pins'),
(0,'Anse Boileau','Anse Boileau'),
(0,'Anse Etoile','Anse Etoile'),
(0,'Anse Kerlan','Anse Kerlan'),
(0,'Anse Possession','Anse Possession'),
(0,'Anse Royale','Anse Royale'),
(0,'Anse Volbert Village','Anse Volbert Village'),
(0,'Au Cap','Au Cap'),
(0,'Baie Lazare Mahe','Baie Lazare Mahe'),
(0,'Baie Sainte Anne','Baie Sainte Anne'),
(0,'Baie St Anne','Baie St Anne'),
(0,'Beau Vallon','Beau Vallon'),
(0,'Bel Ombre','Bel Ombre'),
(0,'Bird Island','Bird Island'),
(0,'Cerf Island','Cerf Island'),
(0,'Cousine','Cousine'),
(0,'De Quincey Village','De Quincey Village'),
(0,'Denis Island','Denis Island'),
(0,'Desroches','Desroches'),
(0,'Eden Island','Eden Island'),
(0,'Felicite','Felicite'),
(0,'Fregate Island','Fregate Island'),
(0,'Glacis','Glacis'),
(0,'Grand Anse','Grand Anse'),
(0,'Grandanse','Grandanse'),
(0,'Grandanse Praslin','Grandanse Praslin'),
(0,'La Digue','La Digue'),
(0,'La Reunion','La Reunion'),
(0,'Machabee','Machabee'),
(0,'Mahe','Mahe'),
(0,'North Island','North Island'),
(0,'Pinte Au Sel','Pinte Au Sel'),
(0,'Pointe Au Sel','Pointe Au Sel'),
(0,'Pointe Larue','Pointe Larue'),
(0,'Port Glaud','Port Glaud'),
(0,'Praslin','Praslin'),
(0,'Silhouette Island','Silhouette Island'),
(0,'Takamaka','Takamaka');


CREATE TABLE employees(
    employee_id INT NOT NULL AUTO_INCREMENT,
    employee_type INT NOT NULL,  -- 1 manager 2 clerk
    first_name VARCHAR(20),
    is_active INT NOT NULL,
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    address VARCHAR(80),
    nic VARCHAR(12) NOT NULL,
    dob DATE,
    gender INT(1),
    primary_contact_no VARCHAR(10) NOT NULL,
    branch_id INT NOT NULL,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='employees';

INSERT INTO `employees` (`employee_id`, `employee_type`, `is_active`, `first_name`, `middle_name`, `last_name`, `address`, `nic`, `dob`, `gender`, `primary_contact_no`, `branch_id`) VALUES
(1,1, 0, 'John', 'Aniston', 'Smith', '123,Albert St, Victoria, Seychelles', '903611178V', '1969-12-26', '1', '0766220249', 1),
(2,2, 0, 'Emma', 'Ruthann', 'Marasco', '21,Capital City, Independence Ave, Seychelles', '933611178V', '1997-11-26', '2', '0716220249', 1),
(3,1, 0, 'Theresa', 'Amelia', 'May', '26,Park Road,Virginia', '697911178V', '1969-02-23', '2', '0766220249', 11),
(4,2, 0, 'Albert', 'William', 'Brethan', '12,German Town,New South Wales', '983672354V', '1998-01-08', '1', '0717303215', 11),
(5,2, 0, 'Admin', 'Admin', 'Admin', 'Mallavi', '123456789v', '1998-08-25', '1', '0771234567', 31);


CREATE TABLE employee_logins(    
    employee_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100),
    recovery_contact_no VARCHAR(10),
    recovery_email VARCHAR(50),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(username),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='employee_logins';

INSERT INTO `employee_logins` (`employee_id`, `username`, `password`, `recovery_contact_no`, `recovery_email`, `last_login`) VALUES
(1, 'Charangan', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '0766220249', 'johnsmith@gmail.com', '2020-01-02 00:19:56'),
(2, 'Volka', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '0716220249', 'emma@gmail.com', '2020-01-04 00:19:56'),
(3, 'Manager', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '0717303215', 'theresamay@banka.com', '2020-01-07 00:19:56'),
(4, 'Clerk', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '0112816336', 'albertbrethan@yahoo.com', '2020-01-01 00:19:56'),
(5, 'Admin', '$2b$10$qwUJdI745s87NMYeQtTbTuEuzF0c9636byqMCImXI6XxNxz842A7W', '0112816336', 'albertbrethan@yahoo.com', '2020-01-01 00:19:56');


CREATE TABLE accounts(
    account_no BIGINT NOT NULL AUTO_INCREMENT,
    is_active INT NOT NULL,
    balance FLOAT,
    primary_customer_id INT NOT NULL,    
    primary_branch_id INT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (primary_branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (primary_customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='accounts';
ALTER TABLE accounts AUTO_INCREMENT=22601003929;


INSERT INTO `accounts` (`account_no`,`is_active`, `balance`, `primary_customer_id`, `primary_branch_id`, `date_created`) VALUES
(22601003929,0, -1800, 5, 1, '2020-01-02 00:17:47'),
(22601003930,0, 1000, 1, 1, '2020-01-02 00:19:56'),
(22601003931,0, 500, 2, 1, '2020-01-02 00:20:38'),
(22601003932,0, 600, 3, 1, '2020-01-02 00:21:56'),
(22601003933,0, 150, 4, 1, '2020-01-02 00:22:50'),
(22601003934,0, 500, 3, 1, '2020-01-02 00:23:27'),
(22601003935,0, -900, 4, 1,'2020-01-02 00:26:49');

CREATE TABLE checking_accounts( 
    account_no BIGINT NOT NULL,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='checking_accounts';

INSERT INTO `checking_accounts` (`account_no`) VALUES
(22601003929),
(22601003935);


CREATE TABLE savings_account_plans(
    plan_id INT NOT NULL,
    account_plan VARCHAR(10),
    minimum_balance FLOAT,
    interest FLOAT,
    PRIMARY KEY (plan_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='savings_account_plans';


INSERT INTO `savings_account_plans` (`plan_id`, `account_plan`, `minimum_balance`, `interest`) VALUES
(1, 'Children', 0, 12),
(2, 'Teen', 500, 11),
(3, 'Adult(18+)', 1000, 10),
(4, 'Senior', 1000, 13);


CREATE TABLE savings_accounts(
    account_no BIGINT NOT NULL,
    number_of_withdrawals INT CHECK (number_of_withdrawals <= 5),
    plan_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES savings_account_plans(plan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='savings_accounts';

DELIMITER $$
CREATE EVENT updateInterest
ON SCHEDULE EVERY 1 MINUTE  
STARTS CURRENT_TIMESTAMP
DO 
BEGIN 
    update accounts inner join savings_accounts on accounts.account_no = savings_accounts.account_no inner join savings_account_plans on savings_account_plans.plan_id = savings_accounts.plan_id
    set accounts.balance = accounts.balance + accounts.balance*(savings_account_plans.interest/100);
END; $$
DELIMITER ;


INSERT INTO `savings_accounts` (`account_no`, `number_of_withdrawals`, `plan_id`) VALUES
(22601003930, 0, 3),
(22601003931, 0, 2),
(22601003932, 0, 4),
(22601003933, 0, 3),
(22601003934, 0, 1);


CREATE TABLE transaction_details(
    transaction_id INT AUTO_INCREMENT,
    account_no BIGINT NOT NULL,
    amount FLOAT NOT NULL,
	withdraw INT, -- if 1 withdraw else deposit
    detail VARCHAR(20),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    teller VARCHAR(20),
    branch_id INT NOT NULL,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(transaction_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='transaction_details';

INSERT INTO `transaction_details` (`transaction_id`, `account_no`, `amount`,`withdraw`,`detail`,`date_time`,`teller`,`branch_id`) VALUES
(1, 22601003930, 10000, 1 , "done","2020-01-02 00:19:56",2,1),
(2, 22601003931, 15000, 2 ,"done","2020-01-02 00:19:56","self",1),
(3, 22601003932, 10500, 1,"done","2020-01-02 00:19:56",4,1),
(4, 22601003933, 20200, 2,"done","2020-01-02 00:19:56","self",1),
(5, 22601003934, 35060, 1,"done","2020-01-02 00:19:56","self",1),
(6, 22601003934, 78965, 1,"done","2020-01-02 00:19:56","self",1);


-- peoples deposit or withdraw money by visiting
CREATE TABLE bank_transactions(
    transaction_id INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='bank_transactions';

INSERT INTO bank_transactions (transaction_id) values 
(1), 
(3);

-- atm withdraw
CREATE TABLE atm_transactions(
    atm_transaction_id INT NOT NULL AUTO_INCREMENT,
	transaction_id INT NOT NULL,
    atm_id INT NOT NULL,
	PRIMARY KEY(atm_transaction_id),
    FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='atm_transactions';

INSERT INTO atm_transactions (atm_transaction_id, transaction_id, atm_id) values 
(1, 2, 145623987), 
(2, 4, 123456789);

-- through online portal
CREATE TABLE online_transactions(
    online_transaction_id INT NOT NULL AUTO_INCREMENT,
	withdrawal_id INT,
	deposit_id INT,
    FOREIGN KEY (withdrawal_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/,
	FOREIGN KEY (deposit_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY(online_transaction_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='online_transactions';

INSERT INTO online_transactions (online_transaction_id, withdrawal_id, deposit_id) values 
(1, 5, 6);

CREATE TABLE loan_types( 
    type_id INT NOT NULL,       
    type_name VARCHAR(15),
    interest_rate FLOAT NOT NULL,
    PRIMARY KEY (type_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='loan_types';

INSERT INTO loan_types (type_id, type_name, interest_rate) values 
(1, "Farming Loan", 0.04), 
(2, "Business Loan", 0.07);


CREATE TABLE loans(
    loan_id BIGINT NOT NULL AUTO_INCREMENT,
    loan_type INT,
    account_no BIGINT NOT NULL,      
    amount FLOAT,
    branch_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    time_period INT,
    installment FLOAT,
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    requested_by INT,
    loan_status INT NOT NULL, /* if 0 pending 1 active  2 finished 3 rejected */
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (loan_type) REFERENCES loan_types(type_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (loan_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='loans';
ALTER TABLE loans AUTO_INCREMENT=11301003989;


DELIMITER $$
CREATE FUNCTION calculateInstallment(
	amount INT, 
    plan_id INT,
    time_period INT
) 
RETURNS FLOAT
DETERMINISTIC
BEGIN
    DECLARE interest FLOAT;
    SELECT 
		lt.interest_rate INTO interest
    FROM 
		loan_types lt
	WHERE lt.type_id = plan_id;

	RETURN ((amount + (amount*interest))/time_period);
END$$
DELIMITER ;

INSERT INTO loans (loan_type, account_no, amount, branch_id, time_period, installment, requested_date, requested_by, loan_status) values 
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 0),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 0),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 1),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 0),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 1),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 0),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 1),
(1, "22601003929", 24000.00, 1, 12, 2080.00, '2021-02-13 00:20:38', 2, 0);


CREATE TABLE bank_visit_loans( 
    loan_id BIGINT NOT NULL,
    approved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_by INT,
    requested_by INT,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (approved_by) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (requested_by) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='bank_visit_loans';


CREATE TABLE fixed_deposit_plans(
    plan_id INT NOT NULL,
    time_period VARCHAR(10) NOT NULL,
    interest FLOAT NOT NULL,
    PRIMARY KEY (plan_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='fixed_deposit_plans';

INSERT INTO `fixed_deposit_plans` (`plan_id`, `time_period`, `interest`) VALUES
(1, '6 months', 13),
(2, '1 year', 14),
(3, '3 years', 15);


CREATE TABLE fixed_deposits(
    fd_no BIGINT NOT NULL AUTO_INCREMENT,
    account_no BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    date_opened TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    plan_id INT NOT NULL,
    fd_status INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES fixed_deposit_plans(plan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES savings_accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY (fd_no)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='fixed_deposits';
ALTER TABLE fixed_deposits AUTO_INCREMENT=11201003969;

INSERT INTO `fixed_deposits` (`account_no`, `amount`, `date_opened`, `plan_id`, `fd_status`) VALUES
(22601003932, 2000.00, '2021-02-13 00:20:38', 1, 0),
(22601003930, 2500.00, '2021-02-13 00:20:38', 2, 0),
(22601003931, 1500.00, '2021-02-13 00:20:38', 3, 0);

DELIMITER $$
CREATE EVENT updateInterestFD
ON SCHEDULE EVERY 1 MINUTE  
STARTS CURRENT_TIMESTAMP
DO 
BEGIN 
    update accounts inner join fixed_deposits on accounts.account_no = fixed_deposits.account_no inner join fixed_deposit_plans on fixed_deposits.plan_id = fixed_deposit_plans.plan_id
    set accounts.balance = accounts.balance + accounts.balance*(fixed_deposit_plans.interest/100);
END; $$
DELIMITER ;



CREATE TABLE online_loans( 
    loan_id BIGINT NOT NULL,
    fd_no BIGINT NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (fd_no) REFERENCES fixed_deposits(fd_no) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='online_loans';

-- pay installments by visiting to the bank
CREATE TABLE loan_installment_banks(
    installment_id INT AUTO_INCREMENT,
    loan_id BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    due_date DATE,
    paid_date TIMESTAMP,
    installment_status INT NOT NULL, /* if 0 not paid, 1 paid */
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (installment_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='loan_installment_banks';

CREATE TABLE loan_transactions(
    transaction_id INT NOT NULL PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id), /*ON DELETE SET NULL*/
    FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='loan_transactions';

CREATE TABLE loan_arrears(
    loan_id BIGINT NOT NULL,
    due_date DATE,
    arrear_status INT NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (loan_id,due_date)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='loan_arrears';

show tables;

-- get branch names
DELIMITER $$
CREATE FUNCTION getBranch(
	branch_id INT
) 
RETURNS VARCHAR(64)
DETERMINISTIC
BEGIN
    DECLARE branch_name VARCHAR(128);
    SELECT 
		b.branch_name INTO branch_name
    FROM 
		branches b
	WHERE b.branch_id = branch_id;

	RETURN (branch_name);
END$$
DELIMITER ;


-- view for get deposit details
CREATE VIEW online_deposit_view AS
    SELECT 
        online_transaction_id, 
        account_no as sourceAccount,
        amount,
        detail,
        date_time,
        getBranch(branch_id) as sourceBranch
    FROM
        transaction_details td
	INNER JOIN online_transactions ot ON td.transaction_id = ot.deposit_id;
    
-- view for get withdraw details
CREATE VIEW online_withdraw_view AS
    SELECT 
        online_transaction_id, 
        account_no as destinationAccount,
        getBranch(branch_id) as destinationBranch
    FROM
        transaction_details td
	INNER JOIN online_transactions ot ON td.transaction_id = ot.withdrawal_id;

-- get male female
DELIMITER $$
CREATE FUNCTION getGender(
	gender_id INT
) 
RETURNS VARCHAR(8)
DETERMINISTIC
BEGIN
    DECLARE gender VARCHAR(8);
    IF gender_id <=> 1 THEN  
        SET gender = "Male";
    ELSE 
        SET gender = "Female";
	END IF;
	RETURN (gender);
END$$
DELIMITER ;


-- get status
DELIMITER $$
CREATE FUNCTION getStatus(
	is_active INT
) 
RETURNS VARCHAR(12)
DETERMINISTIC
BEGIN
    DECLARE isAvailable VARCHAR(12);
    IF is_active <=> 0 THEN  
        SET isAvailable = "Available";
    ELSE
        SET isAvailable = "Unavailable";
	END IF;
	RETURN (isAvailable);
END$$
DELIMITER ;


-- get loan status
DELIMITER $$
CREATE FUNCTION getRequestedLoanStatus(
	loan_status INT
) 
RETURNS VARCHAR(12)
DETERMINISTIC
BEGIN
    DECLARE loanStatus VARCHAR(12);
    IF loan_status <=> 0 THEN  
        SET loanStatus = "Pending";
    ELSEIF loan_status <=> 1 THEN
        SET loanStatus = "Accepted";
    ELSE
        SET loanStatus = "Rejected";
	END IF;
	RETURN (loanStatus);
END$$
DELIMITER ;

-- get loan type
DELIMITER $$
CREATE FUNCTION getLoanType(
	loan_type_id INT
) 
RETURNS VARCHAR(64)
DETERMINISTIC
BEGIN
    DECLARE loan_type VARCHAR(64);
    SELECT 
		lp.type_name INTO loan_type
    FROM 
		loan_types lp 
	WHERE lp.type_id = loan_type_id;

	RETURN (loan_type);
END$$
DELIMITER ;


-- get installment type
DELIMITER $$
CREATE FUNCTION getInstallmentType(
	installment_type_id INT
) 
RETURNS VARCHAR(12)
DETERMINISTIC
BEGIN
    DECLARE installment_type VARCHAR(12);
    IF installment_type_id <=> 1 THEN  
        SET installment_type = "Online";
    ELSE
        SET installment_type = "Manual";
	END IF;
	RETURN (installment_type);
END$$
DELIMITER ;



-- get employee name
DELIMITER $$
CREATE FUNCTION getEmployeeName(
	employee_id INT
) 
RETURNS VARCHAR(64)
DETERMINISTIC
BEGIN
    DECLARE employee_name VARCHAR(64);
    SELECT 
		CONCAT(e.first_name, " ", e.last_name) INTO employee_name
    FROM 
		employees e
	WHERE e.employee_id = employee_id;

	RETURN (employee_name);
END$$
DELIMITER ;


-- get loan status
DELIMITER $$
CREATE FUNCTION getLoanStatus(
	loan_status INT
) 
RETURNS VARCHAR(12)
DETERMINISTIC
BEGIN
    DECLARE loanStatus VARCHAR(12);
    IF loan_status <=> 0 THEN  
        SET loanStatus = "Accepted";
    ELSE
        SET loanStatus = "Finished";
	END IF;
	RETURN (loanStatus);
END$$
DELIMITER ;


-- get account status
DELIMITER $$
CREATE FUNCTION getAccountStatus(
	is_active INT
) 
RETURNS VARCHAR(12)
DETERMINISTIC
BEGIN
    DECLARE isActive VARCHAR(12);
    IF is_active <=> 0 THEN  
        SET isActive = "Active";
    ELSE
        SET isActive = "Inactive";
	END IF;
	RETURN (isActive);
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER CheckBookCharge BEFORE INSERT ON checkbooks
FOR EACH ROW
BEGIN 
UPDATE accounts SET balance=(balance-((NEW.number_of_pages)*18)) WHERE account_no=NEW.account_no;
END; $$
DELIMITER ;
