import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { List, Menu, Button, Divider } from 'react-native-paper';
import { StylesRogueLike, Styles, StylesPerfil, StylesTrilha } from "../Styles.js/StyleAjuda";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HelpScreen() {
    const [expanded, setExpanded] = React.useState('');
    const [selectedSection, setSelectedSection] = React.useState('Perfil');
    const [menuVisible, setMenuVisible] = React.useState(false);

    const handlePress = (item) => {
        setExpanded(expanded === item ? '' : item);
    };

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const selectSection = (section) => {
        setSelectedSection(section);
        setExpanded('');
        closeMenu();
    };

    const sections = [
        { key: 'Perfil', title: 'Perfil', icon: require("../Imagens/icons/person.png") },
        { key: 'Trilha', title: 'Trilha', icon: require("../Imagens/icons/board.png") },
        { key: 'Desafio Semanal', title: 'Desafio Semanal', icon: require("../Imagens/icons/trophy.png") },
        { key: 'Roguelike', title: 'Roguelike', icon: require("../Imagens/icons/compass.png") }
    ];

    const renderPerfilContent = () => (
        <View style={Styles.content}>
            <View style={Styles.sectionTitle}>
                <Text style={Styles.guiaTitle}>Perfil</Text>
                <Image
                    source={require("../Imagens/icons/person.png")}
                    style={Styles.imageTitle}
                />
            </View>
            <Text style={Styles.topicos}>
                O que você encontra?
            </Text>
            <Text style={StylesPerfil.paragrafo}>
                Na aba perfil, você tem acesso a todas as informações do seu usuário, tais como:
            </Text>
            <View style={StylesPerfil.listaBox}>
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                        style={StylesPerfil.listaImg}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Nome</Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>A sequência de dias que você está usando o Portuguito</Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Desde quando você tem sua conta</Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>E-mail da sua conta</Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Suas conquistas</Text>
                </View>


            </View>
            <Text style={StylesPerfil.paragrafo}>
                Os botões que estão presentes são:
            </Text>
            <View >
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                        
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Clique no botão “ + ” para alterar sua foto de perfil.</Text>
                </View>
                <Image 
                    source={require('../Imagens/icons/profileButton.png')}
                    style={{marginVertical: 15}}
                />
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Botão para entrar nas configurações do aplicativo.</Text>
                </View>
                <Image 
                    source={require('../Imagens/icons/configuracao.png')}
                    style={{marginVertical: 15}}
                />
                <View style={StylesPerfil.listaItem}>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>Botão para sair da sua conta atual e ir para a tela de Login/Cadastro.</Text>
                </View>
                <Image 
                    source={require('../Imagens/icons/sair.png')}
                    style={{marginVertical: 15}}
                />

            </View>
            <View style={Styles.bordaFinal}></View>
        </View>
    );

    const renderTrilhaContent = () => (
        <View style={Styles.content}>
            <View style={Styles.sectionTitle}>
                <Text style={Styles.guiaTitle}>Trilha</Text>
                <Image
                    source={require("../Imagens/icons/board.png")}
                    style={Styles.imageTitle}
                />
            </View>
            <Text style={Styles.topicos}>
                O que você encontra?
            </Text>
            <Text style={StylesPerfil.paragrafo}>
                Nessa aba, você tem acesso às trilhas para o aprendizado individualizado de cada tema da língua portuguesa. Na tela inicial, você tem acesso a 3 caminhos:
            </Text>
            <View style={StylesPerfil.listaBox}>
                <View style={StylesPerfil.listaItem}>
                    <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}>Morfologia </Text>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>
                        A morfologia estuda a estrutura, a formação, a flexão e a classificação das palavras de uma língua.
                    </Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}>Ortografia </Text>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>
                        A ortografia estuda a forma correta de escrita das palavras de uma língua.
                    </Text>
                </View>
                <View style={StylesPerfil.listaItem}>
                    <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}>Sintaxe </Text>
                    <Image
                        source={require("../Imagens/icons/bola.png")}
                    />
                    <Text style={StylesPerfil.listaItemTexto}>
                        A sintaxe é uma área da gramática que estuda a função e a relação entre as palavras e as orações.
                    </Text>
                </View>



            </View>
            <Text style={StylesTrilha.paragrafo}>
                Em cada uma dessas, áreas você tem diversas tópicos que são separados por temas, exemplo:
            </Text>
            <Text style={StylesTrilha.paragrafo}>
                Morfologia > Classes Gramaticais.
            </Text>
            <Text style={StylesTrilha.ultimoParagrafo}>
                Dentro de cada tópico, seu objetivo vai ser passar pelos desafios até conseguir completar aquela determinada fase.
            </Text>
            <View style={Styles.bordaFinal}></View>
        </View>
    );

    const renderDesafioSemanalContent = () => (
        <View>
            <View style={Styles.sectionTitle}>
                <Text style={Styles.guiaTitle}>Desafio Semanal</Text>
                <Image
                    source={require("../Imagens/icons/trophy.png")}
                    style={Styles.imageTitle}
                />
            </View>
            <Text style={Styles.topicos}>
                O que você encontra?
            </Text>
            <Text style={StylesTrilha.paragrafo}>
                Aqui você tem acesso ao desafio semanal. Seu objetivo é participar todos os dias e concluir o máximo de desafios que conseguir durante a semana.
            </Text>
            <Text style={StylesTrilha.paragrafo}>
                Conforme o jogador for completando as fases, somam-se os pontos para subir no ranking semanal.
            </Text>
            <Text style={StylesTrilha.ultimoParagrafo}>
                O nível das questões são variáveis, portanto, prepare-se para enfrentar qualquer tipo de matéria que temos no nosso banco de questões
            </Text>
            <Text style={StylesTrilha.paragrafo}>
                Classificando os barcos na tela:
            </Text>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    D <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Domingo
                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    2ª  <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Segunda-Feira

                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    3ª  <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Terça-Feira
                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    4ª  <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Quarta-Feira
                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    5ª <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Quinta-Feira
                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    6ª <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Sexta-Feira
                </Text>
            </View>
            <View style={StylesPerfil.listaItem}>
                <Image
                    source={require("../Imagens/icons/bola.png")}
                />
                <Text style={StylesPerfil.listaItemTexto}>
                    S <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}> >  </Text>
                    Sábado
                </Text>
            </View>

            <View style={Styles.desafioSemanal}>
                <Text style={Styles.desafioSemanalTopicos}>Desafio Semanal</Text>
                <Image
                    source={require("../Imagens/icons/ship-wheel.png")}

                />
            </View>

            <Text style={StylesTrilha.ultimoParagrafo}>
                Se você clicar no timão - canto superior direito da tela - estará disponível para visualizar o ranking daquela semana, ou o ranking anterior.
            </Text>
            <View style={Styles.bordaFinal}></View>
            <View style={Styles.bordaFinal}></View>
        </View>
    );

    const renderRoguelikeContent = () => (
        <View style={Styles.content}>
            <View style={Styles.sectionTitle}>
                <Text style={Styles.guiaTitle}>Roguelike</Text>
                <Image
                    source={require("../Imagens/icons/compass.png")}
                    style={Styles.imageTitle}
                />
            </View>
            <View style={StylesRogueLike.section}>
                <Text style={StylesRogueLike.sectionTitle}>
                    O que é?
                </Text>
                <Text style={StylesRogueLike.sectionDescription}>
                    O Roguelike é uma das dinâmicas mais divertidas do nosso app, lá você avança por fases, enfrenta inimigos e corre contra o tempo.
                </Text>
            </View>
            <View style={StylesRogueLike.section}>
                <Text style={StylesRogueLike.sectionTitle}>
                    Personagens
                </Text>
                <Text style={StylesRogueLike.sectionDescription}>
                    Antes de começar sua trajetória de guerreiro, há, na tela inicial, alguns personagens para a sua escolha, porém é preciso desbloqueá-los:
                </Text>
            </View>
            <View style={StylesRogueLike.gridCharacter}>
                <View style={StylesRogueLike.gridItem}>
                    <Text style={StylesRogueLike.gridItemTitle}>Portuguita (padrão)</Text>
                    <Image
                        source={require('../Imagens/adventure/portuguitaFront.png')}
                        style={StylesRogueLike.character}
                    />
                </View>
                <View>
                    <Text style={StylesRogueLike.gridItemTitle} >Papatuguito</Text>
                    <Image
                        source={require('../Imagens/adventure/papaituguitoFront.png')}
                        style={StylesRogueLike.character}
                    />
                </View>
                <View>
                    <Text style={StylesRogueLike.gridItemTitle}>Porturei</Text>
                    <Image
                        source={require('../Imagens/adventure/portureiFront.png')}
                        style={StylesRogueLike.character}
                    />
                </View>
                <View>
                    <Text style={StylesRogueLike.gridItemTitle}>Vilãtuguita</Text>
                    <Image
                        source={require('../Imagens/adventure/vilatuguitaFront.png')}
                        style={StylesRogueLike.character}
                    />
                </View>
            </View>
            <View style={StylesRogueLike.section}>
                <View style={StylesRogueLike.titleIcon}>
                    <Text style={StylesRogueLike.sectionTitle}>
                        Mercado Da Aventura
                    </Text>
                    <MaterialCommunityIcons
                        name="store"
                        size={60}
                        color="#F5505A"
                    />
                </View>
                <Text style={StylesRogueLike.sectionDescription}>
                    Para desbloquear qualquer personagem, você deve juntar moedas e comprar no
                    “Mercado da Aventura”.
                </Text>
            </View>
            <View style={StylesRogueLike.section}>
                <View style={StylesRogueLike.titleIcon}>
                    <Text style={StylesRogueLike.sectionTitle}>
                        Ranking da Aventura
                    </Text>
                    <MaterialCommunityIcons
                        name="chart-bar"
                        size={50}
                        color="#F5505A"
                    />
                </View>
                <Text style={StylesRogueLike.sectionDescription}>
                    Caso queira ver o Ranking da Aventura, deve clicar no botão do canto superior direito.
                </Text>
            </View>
            <View style={StylesRogueLike.section}>
                <View style={StylesRogueLike.titleIcon}>
                    <Text style={StylesRogueLike.sectionTitle}>
                        Como Jogar?
                    </Text>
                </View>
                <Text style={StylesRogueLike.sectionDescription}>
                    Ao iniciar sua aventura, você deve escolher algum item para continuar. Saindo dessa tela, ficará disponível o acesso a cada fase.
                </Text>
                <View style={Styles.centralizar}>
                    <Image
                        source={require("../Imagens/background-aventura.png")}
                    />
                </View>

                <Text style={StylesRogueLike.sectionDescription}>
                    Entretanto, antes de começar, é importante se atentar ao quanto de vida, de dano e de tempo extra
                    você tem para passar de cada obstáculo.
                </Text>

                <View style={Styles.centralizar}>
                    <Image
                        source={require("../Imagens/atributos-aventura.png")}
                    />

                    <Text style={StylesRogueLike.sectionDescription}>
                        Quanto mais, melhor!
                    </Text>
                </View>

                <Text style={StylesRogueLike.sectionDescription}>
                    Ao entrar em alguma área de batalha, você escolhe o inimigo que queira enfrentar e, se conseguir derrotá-lo, avança de fase.
                </Text>
                <Text style={StylesRogueLike.sectionDescription}>
                    <Text style={{ color: "#F5505A", fontWeight: "bold", fontSize: 17 }}>Lembre-se:</Text> toda vez que você abandonar a aventura, deverá reiniciar todo o processo!
                </Text>
            </View>
            <View style={Styles.bordaFinal}></View>
        </View>
    );

    const renderContent = () => {
        switch (selectedSection) {
            case 'Perfil':
                return renderPerfilContent();
            case 'Trilha':
                return renderTrilhaContent();
            case 'Desafio Semanal':
                return renderDesafioSemanalContent();
            case 'Roguelike':
                return renderRoguelikeContent();
            default:
                return renderPerfilContent();
        }
    };

    return (
        <LinearGradient colors={["#D5D4FB", "#9B98FC"]} style={[Styles.container]}>
            <View style={Styles.header}>
                <List.Subheader style={Styles.titleHelpPage}>
                    Ajuda
                </List.Subheader>

                <Menu
                    style={{
                        width: 300
                    }}
                    visible={menuVisible}
                    onDismiss={closeMenu}

                    anchor={
                        <Button
                            mode="contained"
                            onPress={openMenu}
                            compact
                            style={Styles.buttonPerfil}
                        >
                            {selectedSection} ▼
                        </Button>
                    } j

                >
                    {sections.map((section) => (
                        <Menu.Item
                            key={section.key}
                            onPress={() => selectSection(section.key)}
                            title={section.title}
                            leadingIcon={section.icon}
                        />
                    ))}
                </Menu>
            </View>

            <Divider />

            {/* Conteúdo da seção selecionada */}
            <ScrollView style={{ padding: 10, width: '100%' }}>
                <List.Section style={{ width: '100%' }}>
                    {renderContent()}
                </List.Section>
            </ScrollView>
        </LinearGradient>
    );
}