[CmdletBinding()]
param(
    [string]$ResourcesPath,
    [string]$ResourceName,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

if ([string]::IsNullOrWhiteSpace($ResourcesPath)) {
    $ResourcesPath = Read-Host 'FXServer resources folder อยู่ที่ไหน? เช่น D:\FXServer\server-data\resources\[local]'
}

if (-not (Test-Path -LiteralPath $ResourcesPath -PathType Container)) {
    throw "ไม่พบ resources folder: $ResourcesPath"
}

if ([string]::IsNullOrWhiteSpace($ResourceName)) {
    $defaultName = Split-Path $repoRoot -Leaf
    $ResourceName = Read-Host "ชื่อ resource สำหรับ junction (Enter เพื่อใช้ '$defaultName')"
    if ([string]::IsNullOrWhiteSpace($ResourceName)) { $ResourceName = $defaultName }
}

$junctionPath = Join-Path $ResourcesPath $ResourceName

if (Test-Path -LiteralPath $junctionPath) {
    $item = Get-Item -LiteralPath $junctionPath -Force
    $isReparsePoint = ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0

    if (-not $Force) {
        throw "ปลายทางมีอยู่แล้ว: $junctionPath`nใช้ -Force เฉพาะเมื่อยืนยันว่าต้องการแทน junction เดิม"
    }

    if (-not $isReparsePoint) {
        throw "ไม่ลบ directory จริงเพื่อความปลอดภัย: $junctionPath"
    }

    Remove-Item -LiteralPath $junctionPath -Force
}

New-Item -ItemType Junction -Path $junctionPath -Target $repoRoot | Out-Null

Write-Host ''
Write-Host 'สร้าง junction สำเร็จ' -ForegroundColor Green
Write-Host "Resource: $junctionPath"
Write-Host "Source:   $repoRoot"
Write-Host ''
Write-Host "เพิ่มบรรทัดนี้ใน server.cfg: ensure $ResourceName"
