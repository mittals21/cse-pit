import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { feesType, students } = await request.json()

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST!,
      port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT || "587", 10),
      secure: process.env.NEXT_PUBLIC_SMTP_PORT === "465",
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_MAIL!,
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD!,
      },
    })

    const sendMailPromises = students.map(async (s: any) => {
      const mailOptions = {
        from: `${process.env.NEXT_PUBLIC_SMTP_NAME} <${process.env.NEXT_PUBLIC_SMTP_MAIL}>`,
        to: s?.email,
        subject: `${
          feesType.charAt(0).toUpperCase() + feesType.slice(1)
        } fees pending`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <body>
          <div>
            <p>Dear ${s?.name},</p>
            <p>This is to kindly inform you that your <strong>fees for ${feesType}</strong> is pending by <strong>₹${
          s?.fees[feesType]?.pending || 0
        }</strong></p>
            <p>Pay the fees before the last date to avoid any inconvenience. Please ignore if already paid.</p>
            <br/>
            <p>Thank You,</p>
            <p>Aadarsh University</p>
          </div>
          </body>
          </html>
        `,
      }
      await transporter.sendMail(mailOptions)
    })

    await Promise.all(sendMailPromises)

    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
    })
  }
}
