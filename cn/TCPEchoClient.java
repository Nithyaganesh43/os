import java.io.*;
import java.net.*;

public class TCPEchoClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 12345;

        Socket socket = new Socket(host, port);
        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        System.out.println("Connected to TCP Echo Server. Type messages:");

        String inputLine;
        while ((inputLine = userInput.readLine()) != null) {
            out.println(inputLine);
            System.out.println("Server says: " + in.readLine());
        }
        socket.close();
    }
}
