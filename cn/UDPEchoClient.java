import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class UDPEchoClient {
    public static void main(String[] args) {
        String serverAddress = "localhost";
        int port = 12345;

        try (DatagramSocket socket = new DatagramSocket();
             Scanner scanner = new Scanner(System.in)) {

            InetAddress serverIP = InetAddress.getByName(serverAddress);

            while (true) {
                System.out.print("Enter message (or 'exit' to quit): ");
                String message = scanner.nextLine();

                if (message.equalsIgnoreCase("exit")) {
                    break;
                }

                byte[] sendData = message.getBytes();

                // Send packet to server
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverIP, port);
                socket.send(sendPacket);

                // Prepare buffer for response
                byte[] receiveBuffer = new byte[1024];
                DatagramPacket receivePacket = new DatagramPacket(receiveBuffer, receiveBuffer.length);

                // Receive echo
                socket.receive(receivePacket);
                String echoedMessage = new String(receivePacket.getData(), 0, receivePacket.getLength());
                System.out.println("Echo from server: " + echoedMessage);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
