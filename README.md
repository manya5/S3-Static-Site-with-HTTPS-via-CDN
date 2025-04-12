# Deploying a Static Website on AWS S3 with CloudFront and HTTPS:

In this step-by-step tutorial, you’ll learn how to deploy a blazing-fast, secure static website using Amazon Web Services (AWS). This guide leverages AWS's free tier, making it perfect for personal projects, portfolios, and simple business sites on the internet with HTTPS support and basic security features.

[![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange?logo=amazon-aws&style=flat-square)](https://aws.amazon.com/free)
[![Tutorial](https://img.shields.io/badge/Read-Blog-blue?logo=hashnode&style=flat-square)](https://staticbymanya.hashnode.dev/deploying-a-static-website-on-aws-s3-with-cloudfront-and-https)

This repo contains a step-by-step guide to **hosting a secure static website on AWS using S3, CloudFront, ACM, and WAF** — all within the **AWS Free Tier**.

---![Screenshot 2025-04-12 013716](https://github.com/user-attachments/assets/277c0e11-eae7-4266-9f3f-f31c0d473234)

🔗 **Read the full blog here**:  
[Deploying a Static Website on AWS S3 with CloudFront and HTTPS](https://staticbymanya.hashnode.dev)

## 🛠️ Prerequisites

- AWS Account
- Basic HTML/CSS/JS knowledge
- (Optional) AWS CLI installed
- No need to purchase a domain — uses S3 website endpoint!

---

## 📌 What You'll Do

1. **Create and configure an S3 Bucket**
2. **Enable Static Website Hosting**
3. **Set up permissions with a Bucket Policy**
4. **Generate an SSL certificate using ACM**
5. **Create a CloudFront distribution** with HTTPS
6. (Optional) **Secure with AWS WAF**
7. (Optional) **Monitor using CloudWatch**

---

## 📁 Folder Structure (Example)

<pre> 

```plaintext
/
├── index.html
├── styles.css
├── script.js
└── README.md

</pre>
---

## 🚀 Deploy Step-by-Step Tutorial
Amazon S3 (Simple Storage Service) will be your hosting server for the static files.

### Step 1: Login to AWS Console
  Open AWS Console and sign in.
  

### Step 2: Navigate to S3
  Search for S3 in the top search bar and click on it.

        
### Step 3: 1.Create an S3 Bucket

   Bucket name should be globally unique
   Uncheck “Block all public access”
   Leave other settings as default
    Click Create bucket!
        
  ![Screenshot 2025-04-12 021447](https://github.com/user-attachments/assets/97fccf2a-54b4-4f38-9b87-1ea7a242e6f4)
      
2.Upload your site files:

Open the newly created bucket
Click Upload, drag in your index.html, CSS, JS, and image files
Click Upload.

![Screenshot 2025-04-12 021333](https://github.com/user-attachments/assets/3fdc6c27-2747-4f59-917c-e7510bb08133)



### Step 4: Enable Static Website Hosting:

1.Go to Properties Tab: In your bucket, click Properties

2.Scroll to Static website hosting

![Screenshot 2025-04-12 022102](https://github.com/user-attachments/assets/8234df7a-90d2-44fb-b557-1c4945381039)

3.Click Edit > Select Enable

![Screenshot 2025-04-12 022323](https://github.com/user-attachments/assets/f356d144-35b2-4bd9-b298-68a3dfb620d8)

4.Set Document Names:
Index document: index.html
Error document: (optional) error.html

![Screenshot 2025-04-12 022402](https://github.com/user-attachments/assets/971be4d0-2d22-4eed-8d6b-41dc89aa1343)

5.Save Changes
You’ll now see an Endpoint URL — this is your temporary website URL hosted via S3.



### Step 5: Make Your Bucket Public (with Caution)

1.To allow visitors to access your site, you must make the files publicly readable.

2.Go to the Permissions tab in your bucket.

3.Scroll to Bucket Policy > Click Edit

4.Paste the following policy (replace yourdomain.com with your actual bucket name):

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::yourdomain.com/*"
    }
  ]
}

![Screenshot 2025-04-12 023423](https://github.com/user-attachments/assets/a73b9e83-1929-405f-9cce-2485cdc4ef27)

This policy will grant public read access to all objects within the "awscloudfriends" S3 bucket.

You can see your website, but it is not your custome domain url

![Screenshot 2025-04-12 023859](https://github.com/user-attachments/assets/9c7bef97-d758-4304-add6-37ba9bcaa73d)



### Step 6: Add HTTPS with CloudFront & ACM :

To make your site secure (HTTPS), you’ll use Amazon CloudFront (CDN) and ACM (SSL Certificates).

✅ Request an SSL Certificate with ACM-

1.Go to Certificate Manager (ACM) in AWS

![Screenshot 2025-04-12 024604](https://github.com/user-attachments/assets/a5d7ef51-fe50-4598-a3d0-6bf059de4e84)

2.Click Request a certificate > Select Public certificate

![Screenshot 2025-04-12 024652](https://github.com/user-attachments/assets/fe8bdf56-87d2-4dfa-a490-4842bd8af101)

3.Add your domain (e.g., yourdomain.com, and *.yourdomain.com for subdomains)

![Screenshot 2025-04-12 025012](https://github.com/user-attachments/assets/c5c3ee02-5565-47d5-b97e-671b1307a769)

4.Choose DNS validation

5.Add the provided DNS records where your domain is registered

![Screenshot 2025-04-12 025103](https://github.com/user-attachments/assets/523d46f8-4a69-422a-899d-c9e5893366b4)

6.Wait for status to turn to "Issued".



### 🌍 Create a CloudFront Distribution

1.Go to CloudFront

2.Click Create distribution

![Screenshot 2025-04-12 030335](https://github.com/user-attachments/assets/21d58e38-22c2-47c2-8a4f-a51134a8812a)

3.Origin Domain: Paste your S3 static website endpoint (not the bucket name)

![Screenshot 2025-04-12 030508](https://github.com/user-attachments/assets/d31c7c1f-956d-478c-adbe-b948a728943e)

4.Set: Viewer protocol policy: Redirect HTTP to HTTPS

![Screenshot 2025-04-12 030723](https://github.com/user-attachments/assets/5f6b0205-9ef4-416f-b135-3303b1b20755)

5.Alternate domain names if had any: Add yourdomain.com, www.yourdomain.com

6.Select the ACM certificate you created
Default root object: index.html

![Screenshot 2025-04-12 030829](https://github.com/user-attachments/assets/86a08b3d-a422-4b94-8182-3455d83bc999)

![Screenshot 2025-04-12 031613](https://github.com/user-attachments/assets/ec5e322d-bec3-4171-920c-b526031b9177)

7.Enable security option if you want extra protection from common web attacks like SQL injections, XSS, etc.
Best for public websites or anything exposed on the internet (even static ones).

You’ll be able to select or create a Web ACL (Access Control List) after this step.

8.Click Create distribution

9.Wait for status to turn Deployed

10.Make a note of your CloudFront URL (e.g., d123abcxyz.cloudfront.net)



### Step 7: Configure DNS for Your Domain(I’m ignoring this step)

1.If you have a custom domain (like yourdomain.com), it’s time to connect it.

2.Log in to your DNS provider (e.g., GoDaddy, Namecheap)

3.Add a CNAME Record:
Name: www (or blank for root domain)
Value: CloudFront domain name (d123abcxyz.cloudfront.net)

4.For root domains (without www), use an ALIAS or ANAME record if supported (or use AWS Route 53)

Now, accessing yourdomain.com or www.yourdomain.com should take you to your static website 🔗



### Step 8: Add Basic Security with AWS WAF

Protect your site from common attacks using AWS WAF (Web Application Firewall).

![Screenshot 2025-04-12 033411](https://github.com/user-attachments/assets/c3a00d17-4784-4ac5-a0eb-5090636e5ca2)

1.Go to the AWS WAF & Shield Console

2.Click Create web ACL

![Screenshot 2025-04-12 034500](https://github.com/user-attachments/assets/b18a4655-9048-488b-96c7-624608ae1034)

3.Give it a name (my-website-acl)
Region: Select us-east-1 (same as CloudFront) or Global

![Screenshot 2025-04-12 034547](https://github.com/user-attachments/assets/f8752107-3e5e-42e2-8e10-44e01ca0be55)

4.Resource type: CloudFront distribution
5.Select your distribution

6.Add Managed Rule Groups
Example: AWSManagedRulesCommonRuleSet (blocks SQLi, XSS, etc.)

![Screenshot 2025-04-12 035016](https://github.com/user-attachments/assets/6bb60642-47ec-4d29-8ec1-55dadc53874c)

(Optional) Add Custom Rules (like IP blocking)

7.Default Action: Allow

8.Click Create web ACL

![Screenshot 2025-04-12 035401](https://github.com/user-attachments/assets/8c03b163-007c-4fb3-91d9-c07f084091f1)

Your CloudFront distribution is now protected by WAF! 🛡

![Screenshot 2025-04-12 035625](https://github.com/user-attachments/assets/f963bec6-729f-4d30-a403-77367474709e)



### Step 9: Monitor Your Website with CloudWatch

1.Navigate to Amazon CloudWatch

![Screenshot 2025-04-12 040301](https://github.com/user-attachments/assets/50e85498-90ea-4110-bc56-6239896a2806)

2.Explore metrics under:
S3 for data usage

![Screenshot 2025-04-12 041406](https://github.com/user-attachments/assets/1ba4e041-2695-4711-843c-81aa80aedb76)
![Screenshot 2025-04-12 041450](https://github.com/user-attachments/assets/1e86c384-8cf9-40d4-8272-91e5f94ae6b4)

CloudFront for request rates, errors, latency

![Screenshot 2025-04-12 041639](https://github.com/user-attachments/assets/9be0de9c-f1b4-4530-bdc3-0a1fa700936a)

3.Set up Alarms to be notified of:
High error rates
Spikes in traffic

This helps keep your site healthy and performance.

## Final Checklist: Go Live!

🔗 Visit your domain — make sure your website loads perfectly

📄 Check content — all images, CSS, and JS should load properly

🔐 Verify HTTPS — your browser should show a padlock

🧪 Test security — try simple attacks and confirm they’re blocked


![Screenshot 2025-04-12 042130](https://github.com/user-attachments/assets/6f164808-eee4-4b8d-aa80-2f0a9af87640)

---

## Conclusion
Congratulations! 🥳 You’ve now hosted a fully functional, secure, and fast static website on AWS — completely under the free tier. Whether it’s a personal portfolio or a client site, this setup is production-ready and scalable

---

## We have successfully Deployed a Static Website to AWS S3 with HTTPS using CloudFront.

Thank you for reading this post! 

Connect with me on LinkedIn at https://www.linkedin.com/in/manya-khede-dev/ 







