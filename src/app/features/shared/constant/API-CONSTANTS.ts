export const API_CONSTANTS: any = {
  login:"master/userlogin",
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
  deleteinquiry : "inquiry/delete/{id}",
// school managemnet system
  schools:'master/school',
  deleteschool:'master/school/{schoolId}',
  updateSchool:'master/school/{schoolId}',
  rolelist:'master/role',
  roleAction :'master/role/{roleId}',
  createlogin:'master/login',
  mobileList:'master/login',
  deletelogin:'master/login/{loginid}',
  Branch:'master/school-branch-detail',

  // module  page
  pageModule:'master/module-page',
  UpdatepageModule:'master/module-page/{PageId}',
 
  //module master
  moduleMaster:'master/module'
  };
