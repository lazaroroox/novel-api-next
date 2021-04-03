module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },

  env: {
    'MYSQL_HOST': '31.220.104.197',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'u786197823_novel',
    'MYSQL_USER': 'u786197823_novel',
      'MYSQL_PASSWORD': '|ODMgqDn1:Sh',
    'TOKEN_SECRET': 'l#eJT9VBnK$15`JAksR*Xb8C*F4<Noeh!GahHRZAc-=c#kb2QUg2fpaHLa}jKW'
  }
}
  