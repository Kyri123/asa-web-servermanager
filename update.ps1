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

if(!(CommandExists "git")) {
    Write-Host -NoNewLine 'Git is not installed. Please install it and run this script again.';
}

Write-Host -NoNewLine 'Do you want to update latest version? It will overwrite any local changes.';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

git stash
git fetch
git checkout main --force
git pull