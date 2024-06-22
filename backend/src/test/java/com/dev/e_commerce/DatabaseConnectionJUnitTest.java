package com.dev.e_commerce;

import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class DatabaseConnectionJUnitTest {

    @Test
    public void testDatabaseConnection() {
        String jdbcUrl = "jdbc:mysql://localhost:3306/diff-jewel";
        String username = "root";
        String password = "Root123";

        try {
            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
            assertNotNull(connection, "Veritabanı bağlantısı başarısız!");
            System.out.println("Veritabanı bağlantısı başarılı!");
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Veritabanı bağlantısı başarısız!");
        }
    }
}