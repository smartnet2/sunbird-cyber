/*
 * Filename: /home/anujkumar/Desktop/public-sunbird/sunbird-portal/src/app/helpers/pdfCreator/uploadUtil.js
 * Path: /home/anujkumar/Desktop/public-sunbird/sunbird-portal/src
 * Author: Anuj Gupta
 */

var azure = require('azure-storage')
var envVariables = require('./../environmentVariablesHelper.js')

/**
 * This is class function use to create container
 * @param {String} name Container name
 */
function UploadUtil (name) {
  this.containerName = name
  const self = this
  if (envVariables.AZURE_ACCOUNT_NAME && envVariables.AZURE_ACCOUNT_KEY) {
    this.blobService = azure.createBlobService(envVariables.AZURE_ACCOUNT_NAME, envVariables.AZURE_ACCOUNT_KEY)
    this.blobService.createContainerIfNotExists(this.containerName, { publicAccessLevel: 'blob' }, function (err) {
      if (err) {
        console.log('Unable to create container in azure: ', JSON.stringify(err))
      } else {
        console.log(self.containerName, ' Container created successfully')
      }
    })
  }
}

/**
 * This function is use to upload file
 * @param {String} destPath 
 * @param {String} sourcePath 
 * @param {Function} callback 
 */
UploadUtil.prototype.uploadFile = function uploadFile (destPath, sourcePath, callback) {
  this.blobService.createBlockBlobFromLocalFile(this.containerName, destPath, sourcePath, callback)
}

/**
 * This function is use to check file is exist or not
 * @param {String} sourcePath 
 * @param {Function} callback 
 */
UploadUtil.prototype.checkFileExist = function checkFileExist (sourcePath, callback) {
  this.blobService.getBlobProperties(this.containerName, sourcePath, callback)
}

module.exports = UploadUtil
