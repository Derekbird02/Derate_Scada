<configuration>
  <system.webServer>

    <!-- Enable iisnode -->
    <handlers>
      <add name="iisnode" path="server\index.js" verb="*" modules="iisnode" />
    </handlers>

    <!-- Redirect API requests to Node server -->
    <rewrite>
      <rules>

        <!-- API routes go to Node -->
        <rule name="API" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^api/.*" />
          <action type="Rewrite" url="server\index.js" />
        </rule>

        <!-- Otherwise, serve React app -->
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="client\index.html" />
        </rule>

      </rules>
    </rewrite>

    <!-- Logging and errors -->
    <iisnode loggingEnabled="true" devErrorsEnabled="true" />

    <!-- Static file serving -->
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>

  </system.webServer>
</configuration>
