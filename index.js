

const express = require('express')
const bodyParser = require('body-parser')
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');
// const JSEncrypt = require("jsencrypt");
const JSEncrypt = require('nodejs-jsencrypt').default;

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 8989

app.post('/dialogflow-fulfillment', (request, response) => {
  // console.log("Validating")
  dialogflowFulfillment(request, response)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

async function makePostRequest(userid, encryptedPassword) {
  try {
    const response = await axios.post('http://43.241.62.118:8080/userRule/api/login', {
      // username: 'admin',
      // password: 'OwZ6Cu2gOKDyVbd/nhwfMK4AwGKxIKuFsELk54S5+BUwcb6S8pOJ6mIBI80mrESB2yKHBqJHZXW1g0lljTBvl9XuZcg/3GQuzTQe+w80d1S+AyhvsbV2pK7u3IPkw5puKvfLBvl45PIxpT/WAak4dZ0/6QCqD60VYE91k4yoPio='
      username: userid,
      password: encryptedPassword
    });
    console.log("Access Token received :", response.data.value.accessToken);

    let respstatus = await response.data.status;
    let respaccesstoken = await response.data.value.accessToken;

    return { respstatus, respaccesstoken };

  } catch (error) {
    console.error(error);
  }
}

async function personalLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType) {
  try {
    const response = await axios.post('http://43.241.62.118:8080/rule/ruleEngine/executeRules', {
      'userId': userid,
      'userName': userid,
      'domainId': '1',
      'buId': '1',
      'channel': 'Agent',
      'inputs': {
        'Age': age,
        'Employment Type': employeeType,
        'nationality': nationality,
        'salary': salary
      }, 'ruleDetails': [
        {
          'ruleId': "29",
          'ruleName': "Personal Loan",
          'operator': null
        }
      ]
    }, {
      'headers': {
        'Content-Type': 'application/json',
        'TENANTID': 'tenant_001',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    console.log("Received response of personal loan request  :", response);

    console.log("Received response for personal loan request  :", response.data.status);

    let respstatus = await response.data.status;
    let respmessage = await response.data.message;

    return { respstatus, respmessage };

  } catch (error) {
    console.error(error);
  }
}

async function homeLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType) {
  try {
    const response = await axios.post('http://43.241.62.118:8080/rule/ruleEngine/executeRules', {
      'userId': userid,
      'userName': userid,
      'domainId': '1',
      'buId': '1',
      'channel': 'Agent',
      'inputs': {
        'Age': age,
        'Employment Type': employeeType,
        'nationality': nationality,
        'salary': salary
      }, 'ruleDetails': [
        {
          'ruleId': "29",
          'ruleName': "Personal Loan",
          'operator': null
        }
      ]
    }, {
      'headers': {
        'Content-Type': 'application/json',
        'TENANTID': 'tenant_001',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    console.log("Received response of personal loan request  :", response);

    console.log("Received response for personal loan request  :", response.data.status);

    let respstatus = await response.data.status;
    let respmessage = await response.data.message;

    return { respstatus, respmessage };

  } catch (error) {
    console.error(error);
  }
}

async function carLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType) {
  try {
    const response = await axios.post('http://43.241.62.118:8080/rule/ruleEngine/executeRules', {
      'userId': userid,
      'userName': userid,
      'domainId': '1',
      'buId': '1',
      'channel': 'Agent',
      'inputs': {
        'Age': age,
        'monthly average balance':'2500',
        'Monthly Salary': salary
      }, 'ruleDetails': [
        {
          'ruleId': "31",
          'ruleName': "Car Loan",
          'operator': null
        }
      ]
    }, {
      'headers': {
        'Content-Type': 'application/json',
        'TENANTID': 'tenant_001',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    console.log("Received response of personal loan request  :", response);

    console.log("Received response for personal loan request  :", response.data.status);

    let respstatus = await response.data.status;
    let respmessage = await response.data.message;

    return { respstatus, respmessage };

  } catch (error) {
    console.error(error);
  }
}



const dialogflowFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response })

  async function userValidate(agent) {

    let context = agent.context.get('getuserid-followup');
    if (!context) throw "getuserid-followup context is not defined in PreferrenceAdd"
    console.log('received context store details for getuserid-followup ', context);

    const password = agent.parameters.password;
    let params = context.parameters;
    const userid = params.userid;
    console.log('received user id is ', userid, ' and Password is : ', password);

    var public_key = '30820276020100300D06092A864886F70D0101010500048202603082025C02010002818100B673EEE9C4A8048D9254EDBA28F8073BC88113A813738F5B6802A3253E34CB0359D897F067244621FBC3DB6D749CB46AB20D17670D65DABD5A0AB5171E77E6BB625FD09CEE118325E64D336BFC7AA2DBEED76EB7FE13A53517F98FC2FFD573073E7A86099D718ADCD985E31F91C0AA143076574311C05478C5F4CA543280E17D020301000102818072D544E99CFCA2E0F7D8BC470EC20CCB73C6C9B85F85BC14ABC1FD2CD39A26AC55401D611189A31A807B25001F050208A547D812E43BD710963B66FEC60E71092D8CEF00D7BBEBFDAAF24D527B05D41A7B7A85B12A2218B8348E4650423D6AC675B3026F2DF9892E1CE90DBCEA6F197F817A7223867CC93C11FA49BC761F3781024100F14FA4CF124ACCA878F1787223BCE95A509F883C7656D90609DA6C1050C28B955B45339885B215D9D1B85CA53D1747B0BA9F8FFD891CA9117ACA1D8AD0E8A0D7024100C18F19A54D32EDBDD4BB4E823C4A0B2165AF40F925E7ADA25C87A30310B3B133B8BF667CB56290C4D46B595B98826F022CFD2F8D13A8EF2BF0DCA67D1E4B81CB024100D47BF8F78D77E7F68168BF52623DBA8D186921A17BE2C57F17B60969E4732A4DFDEC559E7C3B701A391D4A17065035845D109BCDF8AA1005A045D0F5A736F04902404517B1CDE1EAC616B7334D690BE05A6CC78171ADFE2BDF3D4FCE53102B0C19BB1EBDA3F5EC418CEFD5EBA3F020569F0DA5C5930DC6F0CCBF60B142F4F2B57D5502401EBC1FC06094C751E28680C6CDDF13C8376A98AFFD1FAF2D83FFD1852C0B6E50C39ECDA1D28AECCED44E64E1AF1C2EE7632137D3E26E92011D823F339793F5D9';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    var encryptedPassword = encrypt.encrypt(password);
    console.log('Encrypted Password', encryptedPassword);

    const resp_data = await makePostRequest(userid, encryptedPassword);
    console.log('the response for the User Validation request is ', resp_data);

    if (resp_data.respstatus == "1001") {
      agent.add("Validated successfully !!! Please tell me what kind of services are you looking for");

      let context2 = new Object();
      context2 = {
        'name': 'LoanEligibilityChecker', 'lifespan': 4,
        'parameters': context.parameters
      };
      context2.parameters.new = false;
      context2.parameters.refresh = true;
      context2.parameters.userid = userid;
      context2.parameters.accesstoken = resp_data.respaccesstoken;
      agent.context.set(context2);
      console.log('Updated context store details for LoanEligibilityChecker is  ', context2);
    }
    else {
      agent.add("User Validation fails !!! however please hold while we transfer your chat to Agent !!  Once Agent acknowledges you, you can start your conversation.  Please confirm shall I transfer your call to Agent !!! ");

      let context2 = new Object();
      context2 = {
        'name': 'TransferToAgentNV', 'lifespan': 4,
        'parameters': context.parameters
      };
      console.log("ctx: = " + JSON.stringify(context2));
      context2.parameters.new = false;
      context2.parameters.refresh = true;
      context2.parameters.userid = userid;
      agent.context.set(context2);
      console.log('Updated context store details for TransferToAgentNV under user validation is  ', context2);
    }

  }

  async function loanEligChecker(agent) {
    try {
      console.log('loan elig post api call get triggered');

      //Following is the context store handling of loaneligibilitychecker
      let context_loanElig = agent.context.get('loaneligibilitychecker');
      if (!context_loanElig) throw "loaneligibilitychecker context is not defined in PreferrenceAdd"
      console.log('Received context store details for loaneligibilitychecker ', context_loanElig);

      let params_loanElig = context_loanElig.parameters;
      const accessToken = params_loanElig.accesstoken;
      const userid = params_loanElig.userid;
      console.log('Received User id and accessToken are ', accessToken, "  ", userid);

      //Following is the context store handling of loaneligibilitychecker-followup
      let context = agent.context.get('loaneligibilitychecker-followup');
      if (!context) throw "loaneligibilitychecker-followup context is not defined in PreferrenceAdd"
      console.log('Received context store details for loaneligibilitychecker-followup ', context);

      let params = context.parameters;
      const age = params.age.original;
      const loantype = params.loan_type;
      const salary = params.salary;
      const nationality = params.nationality;
      const employeeType = params.employeeType;

      console.log('Received loan type request is ', loantype, ' salary is : ', salary, ' for the age : ', age, ' for the nationality : ', nationality, ' and for the employeeType : ', employeeType);
      let sml_loantype = loantype.toString().toLowerCase();

      if (sml_loantype.includes('personal')) {
        const resp_data = await personalLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType);
        console.log('the response for the Personal loan request is ', resp_data);
        if (resp_data.respstatus == "200")
          agent.add("You are Eligible for Personal Loan!! You may need to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent");
        else
          agent.add("You are not Eligible for Personal Loan!! You may want to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent ");

      } else if (sml_loantype.includes('car')) {
        const resp_data = await carLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType);
        console.log('the response for the Car loan request is ', resp_data);
        if (resp_data.respstatus == "200")
          agent.add("You are Eligible for Car Loan !! You may need to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent");
        else
          agent.add("You are not Eligible for Car Loan!! You may want to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent ");

      } else {
        const resp_data = await homeLoanPostRequest(userid, salary, accessToken, age, loantype, nationality, employeeType);
        console.log('the response for the Home loan request is ', resp_data);
        if (resp_data.respstatus == "200")
          agent.add("You are Eligible for Home Loan !! You may need to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent");
        else
          agent.add("You are not Eligible for Home Loan !! You may want to continue with our Live agent for further assistance.  Shall I connect you to our Live Agent ");

      }




      let context2 = new Object();
      context2 = { 'name': 'TransferToAgentNV', 'lifespan': 4, 'parameters': context.parameters };
      context2.parameters.new = false;
      context2.parameters.refresh = true;
      context2.parameters.userid = userid;
      agent.context.set(context2);
      console.log('Updated context store details for TransferToAgentNV is ', context2);

    } catch (error) {
      console.error(error);
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browser-dependent)
    }

  }

  let intentMap = new Map();
  intentMap.set("GetPassword", userValidate);
  intentMap.set("Loan Eligibility Checker - yes", loanEligChecker);

  agent.handleRequest(intentMap);

}