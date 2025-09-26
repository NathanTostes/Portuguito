import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import Styles from "../Styles.js/StyleAjuda";

export default function HelpScreen() {
    const [expanded, setExpanded] = React.useState('');
    const [mainExpanded, setMainExpanded] = React.useState('');

    const handlePress = (item) => {
        setExpanded(expanded === item ? '' : item);
        setMainExpanded(expanded === item ? '' : item);
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={[Styles.container]}>
            <ScrollView style={{ padding: 10 }}>
                <List.Section>
                    <List.Subheader style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Ajuda do Aplicativo
                    </List.Subheader>
                    <List.Accordion title="Perfil"
                        left={(props) => <List.Icon {...props} icon="sword-cross" />}
                        mainExpanded={expanded === 'Perfil'}
                        onPress={() => handlePress('Perfil')}
                    >
                        <List.Accordion
                        title="Interface do perfil"
                        left={(props) => <List.Icon {...props} icon="help-circle" />}
                        expanded={expanded === 'interface'}
                        onPress={() => handlePress('interface')}
                        >
                            <List.Item
                            titleNumberOfLines={null} descriptionNumberOfLines={null}  description="- Na aba perfil, você tem acesso a informações de usuário, tais como:
- Nome
- A sequência de dias que você está usando o Portuguito
- Desde quando você tem sua conta
- E-mail da sua conta
- Suas conquistas"
                            />
                        </List.Accordion>
                        <List.Accordion
                        title="Botões do perfil"
                        left={(props) => <List.Icon {...props} icon="help-circle" />}
                        expanded={expanded === 'Botoes'}
                        onPress={() => handlePress('Botoes')}
                        >
                            <List.Item
                            titleNumberOfLines={null} descriptionNumberOfLines={null}  description="Os botões que estão presentes são:
- &lt;imagem do botão de foto de perfil&gt; Nesse botão, você consegue alterar sua foto
de perfil.
- &lt;imagem do botão de configuração&gt; Você tem acesso ao app aqui.
- &lt;imagem do botão de sair&gt; Aqui, você consegue sair da sua conta e voltar para a
tela de login do aplicativo."
                            />
                        </List.Accordion>
                    </List.Accordion>
                    <List.Accordion title="Trilha"
                        left={(props) => <List.Icon {...props} icon="sword-cross" />}
                        mainExpanded={expanded === 'Trilha'}
                        onPress={() => handlePress('Trilha')}
                    >
                        <List.Item
                            titleNumberOfLines={null} descriptionNumberOfLines={null}  description="- Nessa aba, você tem acesso às trilhas para o aprendizado individualizado de
cada tema da Língua Portuguesa.
- Na tela inicial da Trilha, você tem acesso a 3 caminhos:
Morfologia: &quot;A morfologia estuda a estrutura, a formação, a flexão e a
classificação das palavras de uma língua”.
Ortografia: “A ortografia estuda a forma correta de escrita das palavras de uma
língua”.
Sintaxe: “A sintaxe é uma área da gramática que estuda a função e a relação entre
as palavras e as orações”.
&lt;imagem da tela com os caminhos&gt;

- Em cada uma dessas áreas, você tem diversos conteúdos que são separados
por temas, exemplo:
Morfologia &gt; Classes Gramaticais.
Dentro de cada tema, seu objetivo vai ser passar pelos desafios até conseguir completar
aquela fase."
                            />
                    </List.Accordion>
                    <List.Accordion title="Desafio Semanal"
                        left={(props) => <List.Icon {...props} icon="sword-cross" />}
                        mainExpanded={expanded === 'Desafio Semanal'}
                        onPress={() => handlePress('Desafio Semanal')}
                    >
                        <List.Item
                            titleNumberOfLines={null} descriptionNumberOfLines={null}  description="- Aqui, você tem acesso ao desafio semanal. O objetivo é participar todos os dias e
concluir o máximo de desafios que conseguir durante a semana.
- Conforme o jogador for completando as fases, somam-se pontos para subir no
ranking semanal.
- O nível das questões é variável, portanto, prepare-se para enfrentar conteúdos
diversos do nosso banco de itens.
- Classificando os barcos na tela:
- D &gt; Domingo
- 2ª &gt; Segunda-feira
- 3ª &gt; Terça-feira
- 4ª &gt; Quarta-feira
- 5ª &gt; Quinta-feira
- 6ª &gt; Sexta-feira
- S &gt; Sábado
- Se você clicar no timão (um tipo de leme, volante) - canto superior direito da tela,
conseguirá visualizar o ranking daquela semana ou o ranking anterior. &lt;imagem
do botão&gt;"
                            />
                    </List.Accordion>
                    <List.Accordion title="Roguelike"
                        left={(props) => <List.Icon {...props} icon="sword-cross" />}
                        mainExpanded={expanded === 'roguelike'}
                        onPress={() => handlePress('roguelike')}>
                    <List.Accordion
                        title="Como funciona o Roguelike?"
                        left={(props) => <List.Icon {...props} icon="help-circle" />}
                        expanded={expanded === 'sobre'}
                        onPress={() => handlePress('sobre')}
                    >
                        <List.Item
                            title="O Roguelike é uma das dinâmicas mais divertidas do app, onde você avança por fases, enfrenta inimigos e corre contra o tempo."
                        />
                    </List.Accordion>

                    <List.Accordion
                        title="Personagens"
                        left={(props) => <List.Icon {...props} icon="account-group" />}
                        expanded={expanded === 'personagens'}
                        onPress={() => handlePress('personagens')}
                    >
                        <List.Item titleNumberOfLines={null} descriptionNumberOfLines={null} description="Antes de começar sua trajetória de guerreiro, há, na tela inicial, alguns personagens
para a sua escolha, porém é preciso desbloqueá-los:
- Portuguita (Padrão)
- Papaituguito
- Porturei
- Vilãtuguita

- Para desbloquear qualquer personagem, você deve juntar moedas e comprar no
“Mercado da Aventura” - Canto superior esquerdo. &lt;Imagem do botão&gt;
- Caso queira ver o ranking da Aventura, deve clicar no botão do canto superior direito
&lt;imagem do botão&gt;"/>
                    </List.Accordion>

                    

                    <List.Accordion
                        title="Dicas de Jogo"
                        left={(props) => <List.Icon {...props} icon="lightbulb-on" />}
                        expanded={expanded === 'dicas'}
                        onPress={() => handlePress('dicas')}
                    >
                        <List.Item descriptionNumberOfLines={null} titleNumberOfLines={null} title="⚔️ Lute contra inimigos, 🕒 corra contra o tempo e 💎 junte recursos para evoluir." description= '- O Roguelike, basicamente, funciona da seguinte forma:
- Ao iniciar sua aventura &lt;imagem do botão&gt;, você deve escolher algum item para
continuar. Saindo dessa tela, ficará disponível o acesso a cada fase &lt;imagem da tela&gt;,
mas, antes de começar, é importante se atentar ao quanto de vida, de dano e de tempo
extra &lt;imagem do trecho de botões&gt; você tem para passar de cada obstáculo. Quanto
mais, melhor!
- Ao entrar em alguma área de batalha, você escolhe o inimigo que queira enfrentar e, se
conseguir derrotá-lo, avança de fase.
- Lembre-se: toda vez que você abandonar a aventura, todo o progresso será perdido!
&lt;imagem da pop up&gt;' />
                    </List.Accordion>
                    
                    </List.Accordion>
                </List.Section>
            </ScrollView>
        </LinearGradient>
    );
}