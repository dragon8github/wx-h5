<!--资质认证-->

<template>
    <div>
        <input type="file" accept="image/*" ref="upload"  capture="camera" class="uploadInpt" @change="upload($event)" />
        <video :src="videoURL" controls="controls"></video>
        <input type="file" accept="video/*" capture="camera" ref="videoUpload" @change="videoUpload($event)">
    </div>
</template>

<script>

    export default {
        data (){
            return {
                options:{
                    fileType:['png','jpg','jpeg','pdf','mp4'],
                    maxSize:'4096KB'
                },
                videoURL:''
            }
        },
        methods:{
            upload (e) {
                var that = this;
                var vFile = e.target.value;
                 var fd = new FormData();
                console.log(e)
                if(!vFile){
                    alert('err')
                    return;
                }else{
                    var vType = vFile.split('.').pop().toLocaleLowerCase();
                    window.URL = window.FileReader || window.FileReader;
                    console.log(window.URL)
                    console.log(vType);
                    var fileType = this.options.fileType || [];
                    //允许上传的图片类型
                    if(fileType.indexOf(vType.toLocaleLowerCase()) == -1){
                        console.log("暂不支持该类型的文件，请重新选择!");
                        return;
                    }
                    for(var i=0, file; file=e.target.files[i++];){
                        var maxSize = parseInt(this.options.maxSize)
                        var sizeTip = ''
                        if(maxSize > 1024){
                            sizeTip = maxSize/1024 + 'M'
                        }else{
                            sizeTip = maxSize + 'KB'
                        }
                        if(this.options.maxSize &&  file.size/1024 > maxSize){
                            this.$message('请上传小于'+ sizeTip +'的文件');
                            return;
                        }
                    }
                    that.preview(e.target.files[0])
                    //文件上传前处理事件
                    if(this.options.beforeSend instanceof Function){
                        if(this.options.beforeSend(e) === false){
                            return false;
                        }
                    }
                    //多文件上传
                    if(this.options.multiple){
                        for(var i=0, file; file=e.target.files[i++];){
                            fd.append('file'+i, file);
                        }
                    }else{
                        fd.append('uploadFile',e.target.files[0]);
                    }
                }
                
            },
            videoUpload(e){
                console.log('video',e)
                alert('video',JSON.stringify(e))
            },
            preview (vFile) {
                // if(window.FileReader){
                //     const reader = new FileReader()
                //     reader.onload = (e) => {
                //         this.videoURL = e.target.result
                //     }
                //     reader.readAsDataURL(vFile)
                // }
            }
        }
    }
</script>