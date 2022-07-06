def get_html_email_template(otp):
  return f'''<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</head>
	<body
		style="
			background-color: #f6f9fc;
			margin: 0;
			padding: 0;
			font-family: sans-serif;
		"
	>
		<center
			class="main-wrapper"
			style="
				width: 100%;
				table-layout: fixed;
				background-color: #f6f9fc;
				padding-bottom: 40px;
			"
		>
			<div class="webkit" style="max-width: 600px; background-color: #ffffff">
				<table
					class="outer"
					align="center"
					style="margin: 0 auto; width: 100%; max-width: 600px"
				>
					<tr>
						<td>
							<table width="100%" style="margin-top: 40px">
								<tr>
									<td style="text-align: center; color: #4756df">
										<h1>DoItBro!</h1>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" style="margin-top: 30px">
								<tr>
									<td>
										<h2 style="margin: 0; text-align: center">Hello</h2>
									</td>
								</tr>
								<tr>
									<td style="text-align: center;">
										<p>Please use the verification code below on the <p style="display: inline; font-weight: bold;">DoItBro</p> App.</p>
									</td>
								</tr>
								<tr>
									<td style="text-align: center;">
										<h2 style="margin: 0;">{otp}</h2>
									</td>
								</tr>
								<tr>
									<td style="text-align: center;">
										<p>If you didn't request this, you can ignore this email.</p>
									</td>
								</tr>
								<tr style="text-align: center;">
									<td>
										Thanks!<br/>
										DoItBro! Team
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
		</center>
	</body>
</html>'''
