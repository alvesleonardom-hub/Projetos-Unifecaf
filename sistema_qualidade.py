"""
Sistema de Controle de Produção e Qualidade
Autor: Leonardo Alves
Versão: 1.0
"""
# ===== REGRAS DE QUALIDADE =====
peso_minimo = 95
peso_maximo = 105
comprimento_minimo = 10
comprimento_maximo = 20
cores_aceitas = ['azul', 'verde']
pecas_por_caixa = 10

# ===== LISTAS PARA GUARDAR DADOS =====
todas_pecas = []
caixas_fechadas = []
caixa_aberta = []
numero_peca = 1


# ===== PROGRAMA PRINCIPAL =====
print("\n========================================")
print("   SISTEMA DE CONTROLE DE QUALIDADE")
print("========================================")

while True:
    # Mostrar menu
    print("\n========================================")
    print("MENU:")
    print("1 - Cadastrar nova peça")
    print("2 - Listar peças")
    print("3 - Remover peça")
    print("4 - Ver caixas")
    print("5 - Relatório")
    print("6 - Sair")
    print("========================================")
    
    opcao = input("\nEscolha (1-6): ")
    
    
    # ===== OPÇÃO 1: CADASTRAR =====
    if opcao == '1':
        print("\n--- CADASTRAR PEÇA ---")
        
        # Pegar dados
        peso = float(input("Peso (g): "))
        cor = input("Cor: ").lower()
        comprimento = float(input("Comprimento (cm): "))
        
        # Verificação
        problemas = []
        
        if peso < peso_minimo or peso > peso_maximo:
            problemas.append(f"Peso ruim: {peso}g (precisa ser {peso_minimo}-{peso_maximo}g)")
        
        if cor not in cores_aceitas:
            problemas.append(f"Cor ruim: {cor} (precisa ser azul ou verde)")
        
        if comprimento < comprimento_minimo or comprimento > comprimento_maximo:
            problemas.append(f"Comprimento ruim: {comprimento}cm (precisa ser {comprimento_minimo}-{comprimento_maximo}cm)")
        
        # Salvar peça
        peca = {
            'id': numero_peca,
            'peso': peso,
            'cor': cor,
            'comprimento': comprimento,
            'boa': len(problemas) == 0,
            'problemas': problemas
        }
        
        todas_pecas.append(peca)
        
        # Mostrar resultado
        if peca['boa']:
            print(f"\nPeça {numero_peca} APROVADA!")
            caixa_aberta.append(peca)
            print(f"Caixa atual: {len(caixa_aberta)}/{pecas_por_caixa}")
            
            # Fechar caixa se tiver 10
            if len(caixa_aberta) == pecas_por_caixa:
                caixas_fechadas.append(caixa_aberta)
                print(f"\nCAIXA FECHADA! Total de caixas: {len(caixas_fechadas)}")
                caixa_aberta = []
        else:
            print(f"\nPeça {numero_peca} REPROVADA!")
            for problema in problemas:
                print(f"  - {problema}")
        
        numero_peca = numero_peca + 1
    
    
    # ===== OPÇÃO 2: LISTAR =====
    elif opcao == '2':
        print("\n--- LISTA DE PEÇAS ---")
        
        if len(todas_pecas) == 0:
            print("Nenhuma peça cadastrada ainda")
        else:
            print("\nAPROVADAS:")
            for peca in todas_pecas:
                if peca['boa']:
                    print(f"  ID {peca['id']} - {peca['peso']}g - {peca['cor']} - {peca['comprimento']}cm")
            
            print("\nREPROVADAS:")
            for peca in todas_pecas:
                if not peca['boa']:
                    print(f"  ID {peca['id']} - {peca['peso']}g - {peca['cor']} - {peca['comprimento']}cm")
                    for problema in peca['problemas']:
                        print(f"     * {problema}")
    
    
    # ===== OPÇÃO 3: REMOVER =====
    elif opcao == '3':
        print("\n--- REMOVER PEÇA ---")
        
        id_remover = int(input("Digite o ID da peça: "))
        
        encontrou = False
        for i in range(len(todas_pecas)):
            if todas_pecas[i]['id'] == id_remover:
                peca_removida = todas_pecas[i]
                todas_pecas.pop(i)
                
                # Remover da caixa aberta se estiver lá
                for j in range(len(caixa_aberta)):
                    if caixa_aberta[j]['id'] == id_remover:
                        caixa_aberta.pop(j)
                        break
                
                print(f"\nPeça {id_remover} removida!")
                encontrou = True
                break
        
        if not encontrou:
            print(f"\nPeça {id_remover} não existe!")
    
    
    # ===== OPÇÃO 4: VER CAIXAS =====
    elif opcao == '4':
        print("\n--- CAIXAS ---")
        
        if len(caixas_fechadas) == 0:
            print("Nenhuma caixa fechada ainda")
        else:
            for i in range(len(caixas_fechadas)):
                caixa = caixas_fechadas[i]
                print(f"\nCaixa {i+1}:")
                ids = []
                for peca in caixa:
                    ids.append(str(peca['id']))
                print(f"  Peças: {', '.join(ids)}")
        
        if len(caixa_aberta) > 0:
            print(f"\nCaixa aberta: {len(caixa_aberta)}/{pecas_por_caixa} peças")
    
    
    # ===== OPÇÃO 5: RELATÓRIO =====
    elif opcao == '5':
        print("\n========================================")
        print("         RELATÓRIO FINAL")
        print("========================================")
        
        total = len(todas_pecas)
        aprovadas = 0
        reprovadas = 0
        
        for peca in todas_pecas:
            if peca['boa']:
                aprovadas = aprovadas + 1
            else:
                reprovadas = reprovadas + 1
        
        print(f"\nTotal de peças: {total}")
        print(f"Aprovadas: {aprovadas}")
        print(f"Reprovadas: {reprovadas}")
        print(f"\nCaixas fechadas: {len(caixas_fechadas)}")
        print(f"Peças na caixa aberta: {len(caixa_aberta)}")
        
        if reprovadas > 0:
            print("\nMotivos de reprovação:")
            erro_peso = 0
            erro_cor = 0
            erro_comp = 0
            
            for peca in todas_pecas:
                if not peca['boa']:
                    for problema in peca['problemas']:
                        if 'Peso' in problema:
                            erro_peso = erro_peso + 1
                        if 'Cor' in problema:
                            erro_cor = erro_cor + 1
                        if 'Comprimento' in problema:
                            erro_comp = erro_comp + 1
            
            print(f"  Peso fora da faixa: {erro_peso}")
            print(f"  Cor inválida: {erro_cor}")
            print(f"  Comprimento fora: {erro_comp}")
        
        print("\nCritérios de qualidade:")
        print(f"  Peso: {peso_minimo}g a {peso_maximo}g")
        print(f"  Cores: azul ou verde")
        print(f"  Comprimento: {comprimento_minimo}cm a {comprimento_maximo}cm")
    
    
    # ===== OPÇÃO 6: SAIR =====
    elif opcao == '6':
        print("\nSaindo do sistema...")
        print("Até logo!")
        break
    
    
    # ===== OPÇÃO INVÁLIDA =====
    else:
        print("\nOpção inválida! Digite 1, 2, 3, 4, 5 ou 6")
    
    input("\nAperte ENTER para continuar...")