export const API_CONSTANTS: any = {
  login:"authorization/user/login",
  createStatus :"master/status",
  getstatus:"/master/statusList",
  createUsertype:'master/usertype',
  createInquiryType :'master/inquiryType',
  getinquirytypelist:"master/inquiryTypeList",
  getuserType :'master/usertypelist',
  createuser :"/master/createuser",
  userlist :'master/userList',
  userbyid : 'master/userList?email={email}',
  createinquiry:"/inquiry/createinquiry",
  inquirylist:"inquiry/inquirylist",
  deleteinquiry : "inquiry/delete/{id}"
  };
