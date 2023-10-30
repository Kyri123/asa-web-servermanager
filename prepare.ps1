$WebClient = New-Object System.Net.WebClient

function CommandExists {
    param ($command)
    try {
        $null = Get-Command $command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

if(!(CommandExists "npm")) {
    Write-Host -NoNewLine 'Node or NPM is not installed. Would you like to install it?';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

    Write-Output "Installing npm"
    $WebClient.DownloadFile("https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe",".\nvm-setup.exe")
    Start-Process .\nvm-setup.exe -Wait -ArgumentList '/S'
    Remove-Item .\nvm-setup.exe
    nvm install 18
    nvm use 18
} else {
    Write-Output "npm already installed (skipping)"
}

if(!(CommandExists "pnpm")) {
    Write-Host -NoNewLine 'PNPM is not installed. Would you like to install it?';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

    Write-Output "Installing pnpm"
    npm install -g pnpm
} else {
    Write-Output "pnpm already installed (skipping)"
}

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