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

function MkDirSave {
    param ($path)
    try {
        New-Item -Path $path -ItemType Directory
        Write-Output "Created directory $path"
        return $true
    } catch {
        return $false
    }
}

MkDirSave "asa_server"
MkDirSave "asa_server\backups"
MkDirSave "asa_server\logs"
MkDirSave "asa_server\data"
MkDirSave "asa_server\steamCMD"

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

if(!(CommandExists "yarn")) {
    Write-Host -NoNewLine 'yarn is not installed. Would you like to install it?';
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

    Write-Output "Installing yarn"
    npm install -g yarn
} else {
    Write-Output "yarn already installed (skipping)"
}

if(!(Test-Path -Path .\asa_server\steamCMD)) {
    Write-Output "Downloading SteamCMD"
    $WebClient.DownloadFile("https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip",".\steamcmd.zip")

    Write-Output "Extracting SteamCMD"
    Expand-Archive .\steamcmd.zip -DestinationPath .\asa_server\steamCMD
    Remove-Item .\asa_server\steamcmd.zip

    Write-Output "Running SteamCMD to install and update"
    .\asa_server\steamCMD\steamcmd.exe +quit
} else {
    Write-Output "SteamCMD already installed (skipping)"
}

if(!(Test-Path -Path .\.env))  {
    Write-Output "Creating .env file"
    Copy-Item .\.env.example .\.env
}

yarn
yarn run build

Write-Output "-------------------------------------------------"
Write-Output "Done!"
Write-Output "Please edit the .env file for database connection"
Write-Output "You can now run the server with 'yarn run start'"
Write-Output "-------------------------------------------------"
Pause