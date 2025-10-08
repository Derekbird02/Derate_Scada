icacls "C:\inetpub\wwwroot" /grant "IIS_IUSRS:(OI)(CI)(RX)"
icacls "C:\inetpub\wwwroot\web.config" /grant "IIS_IUSRS:(RX)"
