CREATE TABLE customers(
    customer_id INT AUTO_INCREMENT,
    address_line_1 VARCHAR(30),
    address_line_2 VARCHAR(30),
    address_line_3 VARCHAR(30),
    primary_email VARCHAR(50),
    primary_contact_no VARCHAR(10), 
    PRIMARY KEY(customer_id)
);

INSERT INTO `customers` (`customer_id`, `address_line_1`, `address_line_2`, `address_line_3`, `primary_email`, `primary_contact_no`) VALUES
(1, '1st cross street', 'Germantown', 'Victoria', 'OliverJake@gmail.com', '1234567891'),
(2, 'Park Avenue', 'Florida', 'Marktown', 'AmeliaMargaret@gmail.com', '9876543211'),
(3, 'Queens Street', 'Parktown', 'Queensland', 'DamianWilliam@ymail.com', '5432167891'),
(4, 'Griffith Road', 'Brisbaner', 'Geogiana', 'IslaBethany@outlook.com', '1233214569'),
(5, 'Nathan Circular', 'Briginton', 'Griffith', 'info@uog.sh', '1234543211');

CREATE TABLE customer_emails(  
    customer_id INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
);

CREATE TABLE customer_contact_nos(  
    customer_id INT NOT NULL,
    contact_no VARCHAR(10) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
);

CREATE TABLE individuals(
    customer_id INT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    middle_name VARCHAR(20),
    nic VARCHAR(12) NOT NULL,
    dob DATE,
    gender INT(1),
    PRIMARY KEY(customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
);

INSERT INTO `individuals` (`customer_id`, `first_name`, `last_name`, `middle_name`, `nic`, `dob`, `gender`) VALUES
(1, 'Oliver', 'Jake', 'Noah', '123456789V', '1992-01-02', '1'),
(2, 'Amelia', 'Emma', 'Margaret', '987654321V', '2000-01-15', '2'),
(3, 'William', 'Damian', 'Daniel', '123454321V', '1969-01-12', '1'),
(4, 'Isla', 'Bethany', 'Sophia', '973611178V', '1989-08-15', '2');

CREATE TABLE organizations(
    customer_id INT,
    name VARCHAR(50) NOT NULL,
    bussiness_registration_number VARCHAR(20),
    PRIMARY KEY(customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
);

INSERT INTO `organizations` (`customer_id`, `name`, `bussiness_registration_number`) VALUES
(5, 'University of Griffith', '22601929');

CREATE TABLE organization_individuals(
    organization_id INT,
    individual_id INT,
    FOREIGN KEY (organization_id) REFERENCES organizations(customer_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (individual_id) REFERENCES individuals(customer_id) /*ON DELETE SET NULL*/
);

INSERT INTO `organization_individuals` (`organization_id`, `individual_id`) VALUES
(5, 1),
(5, 2),
(5, 3),
(5, 4);


CREATE TABLE customer_logins(
    customer_id INT,
    username VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    recovery_contact_no VARCHAR(10) NOT NULL,
    recovery_email VARCHAR(50) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(username),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/
);

INSERT INTO `customer_logins` (`customer_id`, `username`, `password`, `recovery_contact_no`, `recovery_email`, `last_login`) VALUES
(1, 'oliverjake', '8cb2237d0679ca88db6464eac60da96345513964', '1234567891', 'OliverJake@gmail.com', '2020-01-02 00:19:56'),
(2, 'ameliaemma', '8cb2237d0679ca88db6464eac60da96345513964', '9876543211', 'AmeliaMargaret@gmail.com', '2020-01-01 00:19:56'),
(3, 'williamdamian', '8cb2237d0679ca88db6464eac60da96345513964', '5432167891', 'DamianWilliam@ymail.com', '2020-01-05 00:19:56'),
(4, 'bethanysophia', '348162101fc6f7e624681b7400b085eeac6df7bd', '1233214569', 'IslaBethany@outlook.com', '2020-01-04 00:19:56');



CREATE TABLE branches(
    branch_id INT AUTO_INCREMENT,
    branch_name VARCHAR(20),
    location VARCHAR(20),
    PRIMARY KEY(branch_id)
);


INSERT INTO branches(branch_name,location)  VALUES
('Head Office Victoria','Victoria'),
('Anse A La Mouche','Anse A La Mouche'),
('Anse Aux Pins','Anse Aux Pins'),
('Anse Boileau','Anse Boileau'),
('Anse Etoile','Anse Etoile'),
('Anse Kerlan','Anse Kerlan'),
('Anse Possession','Anse Possession'),
('Anse Royale','Anse Royale'),
('Anse Volbert Village','Anse Volbert Village'),
('Au Cap','Au Cap'),
('Baie Lazare Mahe','Baie Lazare Mahe'),
('Baie Sainte Anne','Baie Sainte Anne'),
('Baie St Anne','Baie St Anne'),
('Beau Vallon','Beau Vallon'),
('Bel Ombre','Bel Ombre'),
('Bird Island','Bird Island'),
('Cerf Island','Cerf Island'),
('Cousine','Cousine'),
('De Quincey Village','De Quincey Village'),
('Denis Island','Denis Island'),
('Desroches','Desroches'),
('Eden Island','Eden Island'),
('Felicite','Felicite'),
('Fregate Island','Fregate Island'),
('Glacis','Glacis'),
('Grand Anse','Grand Anse'),
('Grandanse','Grandanse'),
('Grandanse Praslin','Grandanse Praslin'),
('La Digue','La Digue'),
('La Reunion','La Reunion'),
('Machabee','Machabee'),
('Mahe','Mahe'),
('North Island','North Island'),
('Pinte Au Sel','Pinte Au Sel'),
('Pointe Au Sel','Pointe Au Sel'),
('Pointe Larue','Pointe Larue'),
('Port Glaud','Port Glaud'),
('Praslin','Praslin'),
('Silhouette Island','Silhouette Island'),
('Takamaka','Takamaka');


CREATE TABLE employees(
    employee_id INT AUTO_INCREMENT,
    first_name VARCHAR(20),
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    address VARCHAR(80),
    nic VARCHAR(12) NOT NULL,
    dob DATE,
    gender INT(1),
    primary_contact_no VARCHAR(10) NOT NULL,
    branch_id INT,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/
);

INSERT INTO `employees` (`employee_id`, `first_name`, `middle_name`, `last_name`, `address`, `nic`, `dob`, `gender`, `primary_contact_no`, `branch_id`) VALUES
(1, 'John', 'Aniston', 'Smith', '123,Albert St, Victoria, Seychelles', '903611178V', '1969-12-26', '1', '0766220249', 1),
(2, 'Emma', 'Ruthann', 'Marasco', '21,Capital City, Independence Ave, Seychelles', '933611178V', '1997-11-26', '2', '0716220249', 1),
(3, 'Theresa', 'Amelia', 'May', '26,Park Road,Virginia', '697911178V', '1969-02-23', '2', '0766220249', 11),
(4, 'Albert', 'William', 'Brethan', '12,German Town,New South Wales', '983672354V', '1998-01-08', '1', '0717303215', 11);


CREATE TABLE employee_contact_nos( 
    employee_id INT NOT NULL,
    contact_no VARCHAR(10) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
);
CREATE TABLE employee_logins(
    employee_id INT,
    username VARCHAR(50),
    password VARCHAR(100),
    recovery_contact_no VARCHAR(10),
    recovery_email VARCHAR(50),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(username),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
);

INSERT INTO `employee_logins` (`employee_id`, `username`, `password`, `recovery_contact_no`, `recovery_email`, `last_login`) VALUES
(1, 'john', '8cb2237d0679ca88db6464eac60da96345513964', '0766220249', 'johnsmith@gmail.com', '2020-01-02 00:19:56'),
(2, 'emma', '8cb2237d0679ca88db6464eac60da96345513964', '0716220249', 'emma@gmail.com', '2020-01-04 00:19:56'),
(3, 'theresa', 'f2515b5363f697393a46f4641e5c6b5ffc7a1d27', '0717303215', 'theresamay@banka.com', '2020-01-07 00:19:56'),
(4, 'albert', '198a52ae72c2d5c6f41914d337dc325238f6a53e', '0112816336', 'albertbrethan@yahoo.com', '2020-01-01 00:19:56');


CREATE TABLE managers(
    employee_id INT,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
);

INSERT INTO `managers` (`employee_id`) VALUES
(1),
(3);

CREATE TABLE clerks(
    employee_id INT,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) /*ON DELETE SET NULL*/
);

INSERT INTO `clerks` (`employee_id`) VALUES
(2),
(4);

CREATE TABLE accounts(
    account_no BIGINT AUTO_INCREMENT,
    balance FLOAT,
    primary_customer_id INT,    
    primary_branch_id INT,
    account_status VARCHAR(10),      
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (primary_branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (primary_customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
);
ALTER TABLE accounts AUTO_INCREMENT=22601003929;


INSERT INTO `accounts` (`account_no`, `balance`, `primary_customer_id`, `primary_branch_id`, `account_status`, `date_created`) VALUES
(22601003929, -1800, 5, 1, 'Active', '2020-01-02 00:17:47'),
(22601003930, 0, 1, 1, 'Active', '2020-01-02 00:19:56'),
(22601003931, 0, 2, 1, 'Active', '2020-01-02 00:20:38'),
(22601003932, 0, 3, 1, 'Active', '2020-01-02 00:21:56'),
(22601003933, 0, 4, 1, 'Active', '2020-01-02 00:22:50'),
(22601003934, 0, 3, 1, 'Active', '2020-01-02 00:23:27'),
(22601003935, -900, 4, 1, 'Active', '2020-01-02 00:26:49');

CREATE TABLE account_branches(   
    account_no BIGINT NOT NULL,       
    branch_id INT NOT NULL,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    FOREIGN KEY (Branch_ID) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/
);

INSERT INTO `account_branches` (`account_no`, `branch_id`) VALUES
(22601003929, 1),
(22601003929, 21),
(22601003929, 51),
(22601003929, 71),
(22601003930, 11),
(22601003930, 31),
(22601003930, 71),
(22601003931, 11),
(22601003931, 51),
(22601003931, 71),
(22601003931, 121),
(22601003932, 11),
(22601003932, 91),
(22601003932, 131),
(22601003932, 151),
(22601003933, 31),
(22601003933, 61),
(22601003933, 91),
(22601003934, 11),
(22601003934, 21),
(22601003934, 31),
(22601003934, 41),
(22601003935, 11),
(22601003935, 81),
(22601003935, 121);


CREATE TABLE customer_accounts( 
    customer_id INT NOT NULL,
    account_no BIGINT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/
);


INSERT INTO `customer_accounts` (`customer_id`, `account_no`) VALUES
(1, 22601003929),
(2, 22601003929),
(3, 22601003929),
(4, 22601003929),
(1, 22601003930),
(2, 22601003931),
(3, 22601003932),
(4, 22601003933),
(3, 22601003934),
(4, 22601003935);


CREATE TABLE checking_accounts( 
    account_no BIGINT,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
);

INSERT INTO `checking_accounts` (`account_no`) VALUES
(22601003929),
(22601003935);


CREATE TABLE checkbooks(
    checkbook_number INT AUTO_INCREMENT,
    account_no BIGINT NOT NULL,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    number_of_pages INT NOT NULL,
    starting_check_number INT NOT NULL,
    FOREIGN KEY (account_no) REFERENCES checking_accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(checkbook_number)
);
 
 INSERT INTO `checkbooks` (`checkbook_number`, `account_no`, `issued_date`, `number_of_pages`, `starting_check_number`) VALUES
(1, 22601003929, '2020-01-01 19:06:05', 100, 20200102),
(2, 22601003935, '2020-01-01 19:07:24', 50, 20200202);


CREATE TABLE savings_account_plans(
    plan_id INT,
    account_plan VARCHAR(10),
    minimum_balance FLOAT,
    interest FLOAT,
    PRIMARY KEY (plan_id)
);


INSERT INTO `savings_account_plans` (`plan_id`, `account_plan`, `minimum_balance`, `interest`) VALUES
(1, 'Children', 0, 12),
(2, 'Teen', 500, 11),
(3, 'Adult(18+)', 1000, 10),
(4, 'Senior', 1000, 13);


CREATE TABLE savings_accounts(
    account_no BIGINT,
    number_of_withdrawals INT CHECK (Number_of_Withdrawals <= 5),
    account_plan_id INT,
    FOREIGN KEY (account_plan_id) REFERENCES savings_account_plans(plan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no)
);

INSERT INTO `savings_accounts` (`account_no`, `number_of_withdrawals`, `account_plan_id`) VALUES
(22601003930, 0, 3),
(22601003931, 0, 2),
(22601003932, 0, 4),
(22601003933, 0, 3),
(22601003934, 0, 1);

CREATE TABLE child_savings_accounts(
    account_no BIGINT,
    first_name VARCHAR(20),
    middle_name VARCHAR(20),
    last_name VARCHAR(20),
    dob DATE,
    gender INT(1),
    FOREIGN KEY (account_no) REFERENCES savings_accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(account_no,first_name,middle_name)
);

INSERT INTO `child_savings_accounts` (`account_no`, `first_name`, `middle_name`, `last_name`, `dob`, `gender`) VALUES
(22601003934, 'Anabella', 'Nicole', 'Rose', '2013-01-23', '2');


CREATE TABLE transaction_details(
    transaction_id INT AUTO_INCREMENT,
    account_no BIGINT NOT NULL,
    amount FLOAT NOT NULL,
	withdraw BOOLEAN,
    balance FLOAT NOT NULL,
    detail VARCHAR(20),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    teller VARCHAR(20),
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    PRIMARY KEY(transaction_id)
);

CREATE TABLE bank_transactions(
    transaction_id INT PRIMARY KEY,
    FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/
);



CREATE TABLE atm_withdrawals(
    atm_transaction_id INT AUTO_INCREMENT,
	transaction_id INT,
    atm_id INT,
	PRIMARY KEY(atm_transaction_id),
    FOREIGN KEY (transaction_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/
);

CREATE TABLE online_transactions(
    online_transaction_id INT AUTO_INCREMENT,
	withdrawal_id INT,
	deposit_id INT,
    FOREIGN KEY (withdrawal_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/,
	FOREIGN KEY (deposit_id) REFERENCES transaction_details(transaction_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY(online_transaction_id)
);
CREATE TABLE loan_types( 
    type_id INT,       
    type_name VARCHAR(15),
    interest_rate FLOAT NOT NULL,
    PRIMARY KEY (type_id)
);
CREATE TABLE requested_loans(
    request_id INT AUTO_INCREMENT,      
    account_no BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    branch_id INT,
    time_period INT NOT NULL,
    installment FLOAT NOT NULL,
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    requested_by INT,
    request_status VARCHAR(10),
    FOREIGN KEY (requested_by) REFERENCES clerks(employee_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (request_id)
);
CREATE TABLE loans(
    loan_id BIGINT AUTO_INCREMENT,
    account_no BIGINT,  
    loan_type INT,
    amount FLOAT,
    branch_id INT,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    time_period INT,
    installment FLOAT,
    FOREIGN KEY (account_no) REFERENCES accounts(account_no) /*ON DELETE SET NULL*/,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (loan_type) REFERENCES loan_types(type_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (loan_id)
);
ALTER TABLE loans AUTO_INCREMENT=11301003989;

CREATE TABLE bank_visit_loans( 
    loan_id BIGINT,
    Approved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_by INT,
    requested_by INT,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (approved_by) REFERENCES managers(employee_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (requested_by) REFERENCES clerks(employee_id) /*ON DELETE SET NULL*/
);

CREATE TABLE fixed_deposit_plans(
    plan_id INT,
    time_period VARCHAR(10) NOT NULL,
    interest FLOAT NOT NULL,
    PRIMARY KEY (plan_id)
);

INSERT INTO `fixed_deposit_plans` (`plan_id`, `time_period`, `interest`) VALUES
(1, '6 months', 13),
(2, '1 year', 14),
(3, '3 years', 15);


CREATE TABLE fixed_deposits(
    fd_no BIGINT AUTO_INCREMENT,
    account_no BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    date_opened TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    plan_id INT NOT NULL,
    transaction_id INT,
    FOREIGN KEY (plan_id) REFERENCES fixed_deposit_plans(plan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (account_no) REFERENCES savings_accounts(account_no) /*ON DELETE SET NULL*/,
    FOREIGN KEY (transaction_id) REFERENCES online_transactions(online_transaction_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (fd_no)
);
ALTER TABLE fixed_deposits AUTO_INCREMENT=11201003969;

CREATE TABLE online_loans( 
    loan_id BIGINT,
    fd_no BIGINT NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    FOREIGN KEY (fd_no) REFERENCES fixed_deposits(fd_no) /*ON DELETE SET NULL*/
);
CREATE TABLE loan_installment_banks(
    installment_id INT AUTO_INCREMENT,
    loan_id BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    due_date DATE,
    paid_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (installment_id)
);

CREATE TABLE loan_arrears(
    loan_id BIGINT NOT NULL,
    due_date DATE,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) /*ON DELETE SET NULL*/,
    PRIMARY KEY (loan_id,due_date)
);

