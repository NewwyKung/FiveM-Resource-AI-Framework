[CmdletBinding()]
param(
    [string]$ResourcesPath,
    [string]$ResourceName,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$resourceRoot = Join-Path $repoRoot 'resource'

if (-not (Test-Path -LiteralPath (Join-Path $resourceRoot 'fxmanifest.lua') -PathType Leaf)) {
    throw "Invalid resource root: fxmanifest.lua was not found in $resourceRoot"
}

if ([string]::IsNullOrWhiteSpace($ResourcesPath)) {
    $ResourcesPath = Read-Host 'FXServer resources/category folder (for example D:\FXServer\server-data\resources\[local])'
}

if (-not (Test-Path -LiteralPath $ResourcesPath -PathType Container)) {
    throw "Resources folder was not found: $ResourcesPath"
}

$resourcesRoot = (Resolve-Path -LiteralPath $ResourcesPath).Path

if ([string]::IsNullOrWhiteSpace($ResourceName)) {
    $defaultName = Split-Path $repoRoot -Leaf
    $ResourceName = Read-Host "Resource junction name (Enter to use '$defaultName')"
    if ([string]::IsNullOrWhiteSpace($ResourceName)) {
        $ResourceName = $defaultName
    }
}

$invalidNameCharacters = [IO.Path]::GetInvalidFileNameChars()
$hasInvalidCharacter = $ResourceName.IndexOfAny($invalidNameCharacters) -ge 0
if ($hasInvalidCharacter -or $ResourceName -in '.', '..' -or [IO.Path]::GetFileName($ResourceName) -ne $ResourceName) {
    throw 'ResourceName must be a single valid directory name.'
}

$junctionPath = Join-Path $resourcesRoot $ResourceName

if (Test-Path -LiteralPath $junctionPath) {
    $item = Get-Item -LiteralPath $junctionPath -Force
    $isReparsePoint = ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0

    if (-not $Force) {
        throw "Destination already exists: $junctionPath. Use -Force only to replace an existing junction or reparse point."
    }

    if (-not $isReparsePoint) {
        throw "Refusing to remove a real directory: $junctionPath"
    }

    Remove-Item -LiteralPath $junctionPath -Force
}

New-Item -ItemType Junction -Path $junctionPath -Target $resourceRoot | Out-Null

Write-Host ''
Write-Host 'Development junction created.' -ForegroundColor Green
Write-Host "Resource: $junctionPath"
Write-Host "Source:   $resourceRoot"
Write-Host ''
Write-Host "Add this line to server.cfg: ensure $ResourceName"
