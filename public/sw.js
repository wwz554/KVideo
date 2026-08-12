self.options = {
    "domain": "5gvci.com",
    "zoneId": 11560378
}
self.lary = ""
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')

// Keep and execute KVideo's original service-worker logic.
importScripts('/kvideo-sw.js')
