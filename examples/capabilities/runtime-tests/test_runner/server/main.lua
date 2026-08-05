RegisterCommand('runtime-tests', function(source, args)
    if source ~= 0 then
        print('[runtime-tests] Run this command from the server console.')
        return
    end

    if args[1] == 'list' then
        for _, name in ipairs(RuntimeTests.List()) do print(('[runtime-tests] %s'):format(name)) end
        return
    end

    local passed, failed = RuntimeTests.RunAll()
    print(('[runtime-tests] complete: %d passed, %d failed'):format(passed, failed))
    SetConvarReplicated('runtime_tests_last_result', failed == 0 and 'passed' or 'failed')
end, true)
