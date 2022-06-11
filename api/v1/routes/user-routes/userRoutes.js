const express = require('express')
const { route } = require('express/lib/application')
const tokenMiddleware = require('../../middleware/tokenMiddleware')
const userServices = require('../../services/user-services/userServices')
const router = express.Router()

router.post('/addgroup', tokenMiddleware.validateToken, userServices.addgroup)
router.get('/allgroup', tokenMiddleware.validateToken, userServices.getAllGroupByLoginId)

// router.post('/itr/update/incomefromsalary', tokenMiddleware.validateToken, userServices.updateIncomeFromSalary)
router.post('/activate', tokenMiddleware.validateToken, userServices.activateItrClient)
router.get('/itr/getall', tokenMiddleware.validateToken, userServices.getAllItrByBranch)
router.get('/itr/getall/id', tokenMiddleware.validateToken, userServices.getAllItrById)
router.post('/itr/search', tokenMiddleware.validateToken)
router.post('/itr/get/:id', tokenMiddleware.validateToken, userServices.getItrById)
router.post('/itr/find', tokenMiddleware.validateToken, userServices.itrSearch)
router.post('/itr/update/status', tokenMiddleware.validateToken, userServices.updateItrStatus)
/* itr update routes */
router.post('/itr/personalinfo', tokenMiddleware.validateToken, userServices.savePersonalInfoItr)
router.post('/itr/update/updateinfo', tokenMiddleware.validateToken, userServices.updateItrInfo1)
router.post('/itr/update/incomefromsalary', tokenMiddleware.validateToken, userServices.updateIncomeFromSalary)
router.post('/itr/update/incomefromproperty', tokenMiddleware.validateToken, userServices.updateIncomeFromProperty)
router.post('/itr/update/incomefromothersources', tokenMiddleware.validateToken, userServices.updateIncomeFromOtherSources)
router.post('/itr/update/capitalgain', tokenMiddleware.validateToken, userServices.updateIncomeFromCapitalGain)
router.post('/itr/update/incomefromprofession', tokenMiddleware.validateToken, userServices.updateIncomeFromProfessionBusiness)
router.post('/itr/update/transportincome', tokenMiddleware.validateToken, userServices.updateIncomeFromTransportBusiness)
router.post('/itr/update/exemptedincome', tokenMiddleware.validateToken, userServices.updateInocmeFromExemptedSources)
router.post('/itr/update/deduction80c', tokenMiddleware.validateToken, userServices.updateDeduction80c)
router.post('/itr/update/otherdeduction', tokenMiddleware.validateToken, userServices.other_deduction)
router.post('/itr/update/deduction80g', tokenMiddleware.validateToken, userServices.updateDeduction80g)
router.post('/itr/update/tdsonsalary', tokenMiddleware.validateToken, userServices.updateTdsOnSalary)
router.post('/itr/update/nonsalarytds', tokenMiddleware.validateToken, userServices.updateNonSalaryTds)
router.post('/itr/update/taxcollectionsource', tokenMiddleware.validateToken, userServices.updateTaxCollectedAtSource)
router.post('/itr/update/advancetax', tokenMiddleware.validateToken, userServices.updateAdvanceTax)
router.post('/itr/update/tds26qt', tokenMiddleware.validateToken, userServices.updateTds26qc)
/* itr update routes ends */
router.post('/recharge/save', tokenMiddleware.validateToken, userServices.rechargeRequest)
router.post('/recharge/bydate', tokenMiddleware.validateToken, userServices.getRechargeByDate)
//write a view recharge router
router.post('/recharge/update', tokenMiddleware.validateToken, userServices.completeRecharge)
router.get('/allrecharge', tokenMiddleware.validateToken, userServices.getAllRechargeById)
router.get('/allreacharge/admin', tokenMiddleware.validateToken, userServices.getAllRecharge)
router.post('/add/product', tokenMiddleware.validateToken, userServices.addProduct)
router.post('/order/getall/id', tokenMiddleware.validateToken, userServices.getOrdersById)
router.get('/allproduct', tokenMiddleware.validateToken, userServices.getAllProduct)
router.post('/order', tokenMiddleware.validateToken, userServices.order)
router.post('/addbank', tokenMiddleware.validateToken, userServices.addBank)
router.get('/allbanks', tokenMiddleware.validateToken, userServices.getAllAdminBanks)
router.get('/allorder', tokenMiddleware.validateToken, userServices.getAllOrders)
router.get('/usercount', tokenMiddleware.validateToken, userServices.getUserCount)
router.post('/gst/register', tokenMiddleware.validateToken, userServices.applyForGst)
router.get('/products/unused', tokenMiddleware.validateToken, userServices.getAllProductUnusedByid)
router.get('/gst/getall/id', tokenMiddleware.validateToken, userServices.getAllGstById)
router.post('/gst/search', tokenMiddleware.validateToken)
router.post('/gst/get/:id', tokenMiddleware.validateToken, userServices.getGstById)
router.post('/gst/return/add', tokenMiddleware.validateToken, userServices.addGstReturn)
router.post('/gst/return/type', tokenMiddleware.validateToken, userServices.gstReturnType)
router.post('/gst/return/submitform', tokenMiddleware.validateToken, userServices.gstReturnSubmitForm)
router.post('/gst/return/all', tokenMiddleware.validateToken, userServices.getAllGstReturn)
router.post('/gst/return/object/id', tokenMiddleware.validateToken, userServices.getGstReturnByObjectId)
router.post('/gst/return/assingtobdm', tokenMiddleware.validateToken, userServices.assignGstReturnToBdm)
router.post('/gst/registration/assigntobdm', tokenMiddleware.validateToken, userServices.assignGstRegistrationToBdm)
router.get('/gst/getall/id', tokenMiddleware.validateToken, userServices.getAllGstReturnById)
router.get('/gst/get/:id', tokenMiddleware.validateToken, userServices.getGstReturnById)
router.get('/gst/return/getall/branch', tokenMiddleware.validateToken, userServices.getAllGstReturnByBranchid)
router.post('/tds/register/client', tokenMiddleware.validateToken, userServices.addTdsClient)
router.post('/tds/update/cllient', tokenMiddleware.validateToken, userServices.tdsClientUpdate)
router.post('/tds/update/client/1', tokenMiddleware.validateToken, userServices.tdsClientUpdate1)
router.post('/tdsmodel/add', tokenMiddleware.validateToken, userServices.addTdsModel)
router.post('/tds/getall/id', tokenMiddleware.validateToken, userServices.getAllTdsClients)
router.post('/prodcts/getall/gst', tokenMiddleware.validateToken, userServices.getAllGstProducts)
router.post('/products/bycategory', tokenMiddleware.validateToken, userServices.getProductsByCategory)
router.post('/product/update', tokenMiddleware.validateToken, userServices.updateProductById)
router.post('/product/delete', tokenMiddleware.validateToken, userServices.deleteProductById)
router.get('/tds/getall/admin', tokenMiddleware.validateToken, userServices.getAllTdsClientsAdmin)
router.get('/tdsmodel/getall/admin', tokenMiddleware.validateToken, userServices.getAllTdsModelAdmin)
router.post('/tds/client/assigntobdm', tokenMiddleware.validateToken, userServices.assignTdsClientToBdm)
router.post('/tds/delete/id', tokenMiddleware.validateToken, userServices.deleteTdsClientById)
// router.post('/fileupload', userServices.fileUpload)
/*
    /recharge/save -- done
    /recharge/update --testing left with admin credential
    /add/product -- done testing complete
    /order
    /add/bank --done testing left
    /add/gst
    /user/delete:id
    /user/getdetails
    /user/search/client
    /user/gst/registration
    /user/gst/add/easybill
    /user/gst/return
    /user/get/order
    /user/itr/personalinfo 
*/
/* Gst Registration Search Queries Routes */
router.post('/gst/registration/bystatus', tokenMiddleware.validateToken, userServices.getGstRegistrationByStatus)
router.get('/gst/getall', tokenMiddleware.validateToken, userServices.getAllGst)

/* Gst Registration Search Queries Routes */
/* */
router.post('/support/save/ticket', tokenMiddleware.validateToken, userServices.saveTicket)
router.get('/support/ticket/all', tokenMiddleware.validateToken, userServices.getAllTicketsById)
/* */
router.get('/bdm/all', tokenMiddleware.validateToken, userServices.getAllBdm)
/* */
module.exports = router