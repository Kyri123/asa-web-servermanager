$WebClient = New-Object System.Net.WebClient

if(!(Test-Path -Path .\steamCMD)) {
    Write-Output "Downloading SteamCMD"
    $WebClient.DownloadFile("https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip",".\steamcmd.zip")

    Write-Output "Extracting SteamCMD"
    Expand-Archive .\steamcmd.zip -DestinationPath .\steamCMD
    Remove-Item .\steamcmd.zip

    Write-Output "Running SteamCMD to install and update"
    .\steamCMD\steamcmd.exe +quit
} else {
    Write-Output "SteamCMD already installed (skipping)"
}

pnpm i
pnpm run lint
pnpm run build