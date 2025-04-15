if 'assetState' in state_Info and len(state_Info['assetState']) > 0:
            for si in state_Info['assetState']:
                a = stateInfo()
                a.blocktimestamp = blocktimestamp  
                if 'tenantId' in si:
                    a.tenantId = si['tenantId']
                if 'assetId' in si:
                    a.assetId = si['assetId']
                if 'siteId' in si:
                    a.siteId = si['siteId']
                if 'currentState' in si:
                    if 'ieccode' in si['currentState']:
                        a.ieccode = si['currentState']['ieccode']
                    if 'ts' in si['currentState']:
                        if len(str(si['currentState']['ts']))>10:
                            a.ts = int(si['currentState']['ts'])/1000
                        else:
                            a.ts = int(si['currentState']['ts'])
                    if 'quality' in si['currentState']:
                        a.quality = si['currentState']['quality']
                    if 'loggedTs' in si['currentState']:
                        if len(str(si['currentState']['loggedTs']))>10:
                            a.loggedTs = int(si['currentState']['loggedTs'])/1000
                        else:
                            a.loggedTs = int(si['currentState']['loggedTs'])

                if 'connectedState' in si:
                    if 'quality' in si['connectedState']:
                        a.connectedState_quality = si['connectedState']['quality']
                    if 'calculatedTs' in si['connectedState']:
                        if len(str(si['connectedState']['calculatedTs']))>10:
                            a.connectedState_calculatedTs = int(si['connectedState']['calculatedTs'])/1000
                        else:
                            a.connectedState_calculatedTs = int(si['connectedState']['calculatedTs'])
                    if 'loggedTs' in si['connectedState']:
                        if len(str(si['connectedState']['loggedTs']))>10:
                            a.connectedState_loggedTs = int(si['connectedState']['loggedTs'])/1000
                        else:
                            a.connectedState_loggedTs = int(si['connectedState']['loggedTs'])
                    if 'machineTs' in si['connectedState']:
                        if len(str(si['connectedState']['machineTs']))>10:
                            a.connectedState_machineTs = int(si['connectedState']['machineTs'])/1000
                        else:
                            a.connectedState_machineTs = int(si['connectedState']['machineTs'])
                    if 'value' in si['connectedState']:
                        a.connectedState_value = si['connectedState']['value']

                    # if 'stateChangeHistory' in si and len(si['stateChangeHistory']) > 0:
                    #     for state in si['stateChangeHistory']:
                    #         a = stateInfo()
                    #         if 'ieccode' in state:
                    #             a.ieccode = state['ieccode']
                    #         if 'ts' in state:
                    #             if len(str(state['ts']))>10:
                    #                 a.ts = int(state['ts'])/1000
                    #             else:
                    #                 a.ts = int(state['ts'])
                    #         if 'quality' in state:
                    #             a.quality = state['quality']
                    #         if 'loggedTs' in state:
                    #             if len(str(state['loggedTs']))>10:
                    #                 a.loggedTs = int(state['loggedTs'])/1000
                    #             else:
                    #                 a.loggedTs = int(state['loggedTs'])
                    #                 statelist.append(a)
                    # if len(si['stateChangeHistory']) > 0:
                    #     for event in si['stateChangeHistory']:
                    #         a = stateInfo()
                    #         if 'code' in event:
                    #             a.ieccode = event['code']
                    #         if 'ts' in event:
                    #             if len(str(event['ts']))>10:
                    #                 a.ts = int(event['ts'])/1000
                    #             else:
                    #                 a.ts = int(event['ts'])
                    #         if 'name' in event:
                    #             a.name = event['name']
                    #         if 'eventClass' in event:
                    #             a.eventClass = event['eventClass']
                    #         if 'desc' in event:
                    #             a.desc = event['desc']
                    #             statelist.append(a)
                a.env = config.esp_env
                statedf = statedf[(statedf['ts'] > (datetime.now()- timedelta(hours=24)).timestamp())]
                statelist.append(a)


                cursor.execute("update rocmetrics.state_info set quality = 0 where connectedstate_value in (0,-1)".format(config.esp_env))
        cursor.execute("update rocmetrics.state_info set connectedstate_quality = 0 where connectedstate_quality is null".format(config.esp_env))
        cursor.execute("update rocmetrics.state_info set connectedstate_value = 0 where connectedstate_value is null".format(config.esp_env))
