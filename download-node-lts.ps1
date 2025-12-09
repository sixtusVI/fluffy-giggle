$ErrorActionPreference = 'Stop'
$r = Invoke-RestMethod 'https://nodejs.org/dist/index.json'
$v = $r | Where-Object { $_.lts -ne $false } | Select-Object -First 1
$url = "https://nodejs.org/dist/$($v.version)/node-$($v.version)-x64.msi"
Write-Host "Downloading: $url"
$OutFile = Join-Path $PWD 'node-lts.msi'
Invoke-WebRequest -Uri $url -OutFile $OutFile
Write-Host "Saved to $OutFile"
Start-Process -FilePath $OutFile -Wait
Write-Host "Installer exited." 
