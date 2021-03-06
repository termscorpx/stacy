require 'nokogiri'
require 'byebug'


Dir.glob('*.html') do |filename|
  html = File.read(filename)
  doc = Nokogiri::HTML(html)
    
  doc.css('a').each do |link_node|
    if link_node['href'].start_with?('https://termsdev.co/stacy')
      link_node['href'] = link_node['href'].gsub 'https://termsdev.co/stacy', '.'
      link_node['href'] += '.html' if link_node['href'] =~ /https:\/\/termsdev.co\/stacy\/.*/
    end

    if link_node['href'] == '.'
      link_node['href'] = 'stacy.html'
    end

  end

  doc.css('.lookbook-links__img img').each do |deal_img_node|
    deal_img_node['src'] = deal_img_node['src'].gsub('assets', filename.gsub('.html', '') + '_files')
  end

  doc.css('.lookbook-nav__link').each do |nav_node|
    nav_node['href'] += '.html' unless nav_node['href'].end_with?('.html')
  end


  File.write(filename, doc.to_html)
end
