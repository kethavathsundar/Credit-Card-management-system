import mysql.connector

def setup_database():
    try:
        # First connection to create database if it doesn't exist
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Sqlworkbench@123"
        )
        cursor = connection.cursor()
        
        # Create the database if it doesn't exist
        cursor.execute("CREATE DATABASE IF NOT EXISTS credit_card_management")
        cursor.close()
        connection.close()

        # Second connection to the specific database
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Sqlworkbench@123",
            database="credit_card_db"
        )
        cursor = connection.cursor()

        # Create the `users` table with `user_type` column
        create_users_table = """
        CREATE TABLE IF NOT EXISTS users (
            customer_id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password_ VARCHAR(255) NOT NULL,  
            address_ TEXT,
            user_type ENUM('user', 'admin') DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        cursor.execute(create_users_table)

        # Create the `credit_cards` table
        create_credit_cards_table = """
        CREATE TABLE IF NOT EXISTS credit_cards (
            customer_id INT,
            card_number VARCHAR(20) PRIMARY KEY,
            card_holder VARCHAR(100) NOT NULL,
            expiry_date DATE NOT NULL,
            credit_limit DECIMAL(15, 2) NOT NULL,  
            status ENUM('Active', 'Blocked', 'Suspended', 'Closed') DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES users(customer_id) ON DELETE CASCADE
        );
        """
        cursor.execute(create_credit_cards_table)

        # Create the `transactions` table
        create_transactions_table = """
        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
            card_number VARCHAR(20), 
            merchant_name VARCHAR(255),
            category TEXT,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            amount DECIMAL(15, 2) NOT NULL,
            outstanding DECIMAL(15, 2) NOT NULL,
            FOREIGN KEY (card_number) REFERENCES credit_cards(card_number) ON DELETE CASCADE
        );
        """
        cursor.execute(create_transactions_table)

        # Commit the changes
        connection.commit()
        print("Database setup completed successfully!")

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()
    
if __name__ == '__main__':
    setup_database()
