<template>
    <span :endTime="endTime" :callback="callback" :endText="endText">
        <slot>
            {{ content || '00:09:59' }}
        </slot>
    </span>
</template>
<script>
    export default {
        data(){
           return {
              content: '',
              timer: null
           }
        },
        props:{
            endTime:{
                // 默认其实没什么意义，而且是个坑，必须从外部传递进来才好
                default : (Date.parse(new Date()) + 10 * 60 * 1000)
            },
            endText:{
               default: '已结束'
            },
            callback : {
                default :''
            }
        },
        methods: {
          countdowm (timestamp) {
              let self = this
              this.timer = setInterval(() => {
                  let nowTime = new Date()
                  let endTime = new Date(timestamp)
                  let t = endTime.getTime() - nowTime.getTime()
                  if (t > 0) {
                      let day  = Math.floor(t / 86400000)
                      let hour = Math.floor((t / 3600000) % 24)
                      let min  = Math.floor((t / 60000) % 60)
                      let sec  = Math.floor((t / 1000) % 60)

                      hour = hour < 10 ? "0" + hour : hour
                      min  = min < 10  ? "0" + min  : min
                      sec  = sec < 10  ? "0" + sec  : sec

                      let format = ''

                      if (day > 0) {
                         format =  `${day}天${hour}小时${min}分${sec}秒`
                      }

                      if (day <= 0 && hour > 0 ) {
                         format = `${hour}小时${min}分${sec}秒`
                      }

                      if (day <= 0 && hour <= 0) {
                         format = `00:${min}:${sec}`
                      }

                      self.content = format

                  } else {
                    window.clearInterval(this.timer)
                    self.content = self.endText
                    self._callback()
                  }
              }, 1000)
          },
          _callback () {
              if (this.callback && this.callback instanceof Function) {
                 this.callback(...this)
              }
          },
          clearTimer () {
              window.clearInterval(this.timer)
              self.content = self.endText
          }
        },  
        beforeMount () {
          this.countdowm(this.endTime)
        }
    }
</script>