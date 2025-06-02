import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UDPEchoServer {
    public static void main(String[] args) {
        int port = 12345;

        try (DatagramSocket socket = new DatagramSocket(port)) {
            System.out.println("UDP Echo Server started on port " + port);

            byte[] buffer = new byte[1024];

            while (true) {
                // Receive packet
                DatagramPacket request = new DatagramPacket(buffer, buffer.length);
                socket.receive(request);

                String received = new String(request.getData(), 0, request.getLength());
                System.out.println("Received: " + received);

                // Send echo response
                DatagramPacket response = new DatagramPacket(
                        request.getData(), request.getLength(),
                        request.getAddress(), request.getPort()
                );
                socket.send(response);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
