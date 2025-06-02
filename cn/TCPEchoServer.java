import java.io.*;
import java.net.*;

public class TCPEchoServer {
    public static void main(String[] args) throws IOException {
        int port = 12345;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("TCP Echo Server started on port " + port);
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket.getInetAddress());

                // Handle each client in a new thread (optional)
                new Thread(() -> {
                    try {
                        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

                        String inputLine;
                        while ((inputLine = in.readLine()) != null) {
                            System.out.println("Received: " + inputLine);
                            out.println("Echo: " + inputLine);
                        }

                        clientSocket.close();
                        System.out.println("Client disconnected.");

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }).start();
            }
        }
    }
}
