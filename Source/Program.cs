using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Threading;

class Program
{
    private const int Port = 8888; // The port number for the server
    private const string ServerAddress = "127.0.0.1"; // Server IP Address

    static void Main(string[] args)
    {
        Timer timer = new Timer(CaptureAndSendScreenshot, null, 0, 5000); // Set a timer to capture every 5 seconds
        Console.WriteLine("Press enter to exit...");
        Console.ReadLine();
    }

    private static void CaptureAndSendScreenshot(object state)
    {
        try
        {
            Bitmap screenshot = CaptureActiveWindow();
            byte[] imageData = ImageToByte(screenshot);

            string serverAddress = GetServerAddress(); // Get the server address

            using (TcpClient client = new TcpClient(serverAddress, Port))
            using (NetworkStream stream = client.GetStream())
            {
                stream.Write(imageData, 0, imageData.Length);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }

    private static string GetServerAddress()
    {
        const string serverFile = "server.txt";
        if (File.Exists(serverFile))
        {
            string serverAddress = File.ReadAllText(serverFile).Trim();
            return !string.IsNullOrEmpty(serverAddress) ? serverAddress : ServerAddress;
        }
        else
        {
            return ServerAddress;
        }
    }

    private static Bitmap CaptureActiveWindow()
    {
        var rect = new User32.Rect();
        IntPtr handle = User32.GetForegroundWindow();
        User32.GetWindowRect(handle, ref rect);

        int width = rect.right - rect.left;
        int height = rect.bottom - rect.top;

        Bitmap bmp = new Bitmap(width, height, PixelFormat.Format32bppArgb);
        Graphics graphics = Graphics.FromImage(bmp);
        graphics.CopyFromScreen(rect.left, rect.top, 0, 0, new Size(width, height), CopyPixelOperation.SourceCopy);

        return bmp;
    }

    private static byte[] ImageToByte(Image img)
    {
        using (var stream = new MemoryStream())
        {
            img.Save(stream, ImageFormat.Jpeg); // Using JPEG format for compression
            return stream.ToArray();
        }
    }

    private static class User32
    {
        [StructLayout(LayoutKind.Sequential)]
        public struct Rect
        {
            public int left;
            public int top;
            public int right;
            public int bottom;
        }

        [DllImport("user32.dll")]
        public static extern IntPtr GetForegroundWindow();

        [DllImport("user32.dll")]
        public static extern bool GetWindowRect(IntPtr hWnd, ref Rect rect);
    }
}
