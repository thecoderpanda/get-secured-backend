const SibApiV3Sdk = require('sib-api-v3-sdk');
const fs = require('fs'); //Filesystem    
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '';

let emaildomain = 'naman@lumoslabs.co';
//

const signupemailcontent = fs.readFileSync("./controllers/emails/signup.html","utf-8");
const questsubmissionemailcontent = fs.readFileSync("./controllers/emails/quest_submitted_email.html","utf-8");
const resetpassword = fs.readFileSync("./controllers/emails/resetpassword.html","utf-8");
const courseemailemail = fs.readFileSync("./controllers/emails/course.html","utf-8");
const resetpasswordsuccess = fs.readFileSync("./controllers/emails/resetpasswordsuccess.html","utf-8");

 async function sendsignupemail(username, emailid) {
       new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
          'subject':'Unleash Your Web3 and Blockchain Power with Lumos Academy!',
           'sender' : {'email': emaildomain, 'name':'Academy at Lumos'},
           'replyTo' : {'email':'naman@lumoslabs.co', 'name':'Academy at Lumos'},
           'to' : [{'name': username, 'email':emailid}],
           'htmlContent' : signupemailcontent,
           'params' : {
             'username': username,
             'emailid': emailid
         }, //replace {{username}} with the username in the email content

         }
       ).then(function(data) {
         console.log('Registration Email sent successfully',data);
       }
         ).catch(function(error) {
         console.error(error);
         });
    
 }

 async function sendtokenemail(username, emailid, link) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Congratulations! Welcome to the World of Web3!',
       'sender' : {'email': emaildomain, 'name':'Academy at Lumos'},
       'replyTo' : {'email':'naman@lumoslabs.co', 'name':'Academy at Lumos'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : resetpassword,
       'params' : {
         'username': username,
          'link': link
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('Password Reset token sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });
  
 }

 async function sendsuccesspassword(username, emailid) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Your Password has been Successfully Changed',
       'sender' : {'email': emaildomain, 'name':'Academy at Lumos'},
       'replyTo' : {'email':'naman@lumoslabs.co', 'name':'Academy at Lumos'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : resetpasswordsuccess,
       'params' : {
         'username': username,
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('Password reset success email sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });
  
 }

 async function courenrolemail( username, emailid, coursetitle) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Congratulations! You have successfully enrolled for {{params.coursetitle}}',
       'sender' : {'email': emaildomain, 'name':'Academy at Lumos'},
       'replyTo' : {'email':'naman@lumoslabs.co', 'name':'Academy at Lumos'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : courseemailemail,
       'params' : {
         'username': username,
          'coursetitle': coursetitle
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('User enrolled to course and email sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });
  
 }
 async function coursecompleted( username, emailid, coursetitle) {
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Congratulations! You have completed the course!',
       'sender' : {'email': emaildomain, 'name':'Academy at Lumos'},
       'replyTo' : {'email':'naman@lumoslabs.co', 'name':'Academy at Lumos'},
       'to' : [{'name': username, 'email':emailid}],
       'htmlContent' : courseemailemail,
       'params' : {
         'username': username,
          'coursetitle': coursetitle
     }, //replace {{username}} with the username in the email content

     }
   ).then(function(data) {
     console.log('User enrolled to course and email sent',data);
   }
     ).catch(function(error) {
     console.error(error);
     });

 }
module.exports = {sendsignupemail,courenrolemail,
sendtokenemail,sendsuccesspassword};



